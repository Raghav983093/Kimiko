// import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deployContracts } from "./deployments";
import { parseEther, zeroAddress } from "viem";
import { IFactory } from "@/typechain-types";
import { toBigInt, type BytesLike } from "ethers";
import { bn } from "./utilities";

enum Category { FASHION, ELECTRONICS, PHONESNTABLETS, FURNITURES, VEHICLES, ANIMALSNPETS, EQUIPMENTSNTOOLS, REPAIRNCONSTRUCTION, SOFTWARES, BABIESNKIDS }
enum StageSelector { COMMIT, ACCEPTED, REJECTED, CANCELLED, INTRANSIT, DELIVERED }
const bytesToString = (arg: BytesLike) => {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder().decode(['string'], arg);
  return abiCoder?.[0]
}

describe("Factory", function () {
  async function deployContractsFixcture() {
    const deployment = await deployContracts();
    const { factory, tUSDT, seller: sellerContract, buyer: buyerContract, buyerAddr: buyerContractAddr, signers } = deployment;
    const { alc1 : seller, alc2: buyer, alc3: other, deployer, feeTo }  = signers;

    const fundAccounts = async() => {
      const accounts = [seller, buyer, other];
      const amountMinted = parseEther('400000');
      let balances : bigint[] = [];

      for(let i = 0; i < accounts.length; i++) {
        await tUSDT.connect(deployer).mint(accounts[i].address);
        const bal = await tUSDT.balanceOf(accounts[i].address);
        balances.push(bal);
      }
      return { accounts, amountMinted, balances, seller, buyer, other }
    }

    const getStorageData = async(): Promise<IFactory.ItemStruct[]> => await factory.getData(); 

    const createAd = async(categorySelector: number) => {
      const params = { 
        qty: 6, 
        pricePerItem: parseEther('500'), 
        descriptn: "Honda Forza 2015, Black Color with brand New Tyres", 
        sellerLocation: "Ibeju Lekki, Lagos",
        imgageLink: "https://link.to.image.com"
      }
      const { qty, pricePerItem, descriptn, sellerLocation, imgageLink} = params;
      await sellerContract.connect(seller).listItem(
        qty,
        categorySelector,
        pricePerItem,
        imgageLink,
        descriptn,
        sellerLocation
      );

      const data = await getStorageData();
      return { ...params, data, categorySelector}
    }

    const getPayment = async() => {
      const amount = await tUSDT.allowance(buyerContractAddr, seller.address);
      await tUSDT.connect(seller).transferFrom(buyerContractAddr, seller.address, amount);
    }

    const placeOrder = async(itemId: number) => {
      const params = {
        reqQuantity: 2,
        buyerOffer: parseEther('420'),
        buyerAddr: "Police Headquatre rd, Akur, Ondo State, Nigeria",
        buyerContact: '+2349026500000, Buyer@gmail.com'
      }

      const initBalOfBuyer = await tUSDT.balanceOf(buyer.address);
      const initBalOfSeller = await tUSDT.balanceOf(seller.address);

      const { reqQuantity, buyerOffer, buyerAddr, buyerContact} = params;
      const commitment = bn(buyerOffer.toString()).times(reqQuantity);
      await tUSDT.connect(buyer).approve(buyerContractAddr, BigInt(commitment.toString()));
      await buyerContract.connect(buyer).startOrder(reqQuantity,itemId, buyerOffer, buyerAddr, buyerContact);
      const data = await getStorageData();
      return {...params, itemId, data, commitment, initBalOfBuyer, initBalOfSeller }
    }

    const editOrder = async(itemId: number, orderId: number) => {
      const param  = {
        newQuantity: 1,
        newOfferPrice: parseEther('440')
      }

      const { newQuantity, newOfferPrice,} = param;

      await buyerContract.connect(buyer).editOrder(newQuantity, itemId, newOfferPrice, orderId);
      const data = await getStorageData();
      return{
        ...param,
        itemId,
        orderId,
        data
      }
    }

    const confirmReceiptOfGoods = async(itemId: number, orderId: number) => {
      const initUSDTBalOfSeller = await tUSDT.balanceOf(seller.address);
      const initUSDTBalOfBuyer = await tUSDT.balanceOf(buyer.address);
      const initData = await getStorageData();
      await buyerContract.connect(buyer).confirmOnReceipt(itemId, orderId);
      const uSDTBalOfSeller = await tUSDT.balanceOf(seller.address);
      const uSDTBalOfBuyer = await tUSDT.balanceOf(buyer.address);
      const dataAfter = await getStorageData();
      return{ 
        initUSDTBalOfSeller,
        initUSDTBalOfBuyer,
        initData,
        uSDTBalOfBuyer,
        uSDTBalOfSeller,
        dataAfter
      }
    }

    const removeItem = async(itemId: number) => {
      await sellerContract.connect(seller).removeItem(itemId);
      const data = await getStorageData();
      return{ data }
    }

    const moveOrder = async(itemId: number, orderId: number, stageSelector: StageSelector) => {
      await sellerContract.connect(seller).acceptOrder(stageSelector, itemId, orderId);
      const data = await getStorageData();
      return { data }
    }

    const cancelOrder = async(itemId: number, orderId: number) => {
      await buyerContract.connect(buyer).cancelOrder(itemId, orderId);
      const data = await getStorageData();
      return { data }
    }

    const editPrice = async(itemId: number) => {
      const newPrice = parseEther('450');
      await sellerContract.connect(seller).editPriceLimit(itemId, newPrice);
      const data = await getStorageData();
      return { data, newPrice }
    }

    const editQuantity = async(itemId: number) => {
      const newQuantity : bigint = 4n;
      await sellerContract.connect(seller).editQuantity(newQuantity, itemId);
      const data = await getStorageData();
      return { data, newQuantity }
    }

    return {
      // ...deployment,
      createAd,
      fundAccounts,
      placeOrder,
      editOrder,
      confirmReceiptOfGoods,
      removeItem,
      moveOrder,
      editPrice,
      editQuantity,
      getPayment,
      cancelOrder,
      sellerContract,
      buyerContract
    };
  }
  
  describe("Factory", function () {
    it("Should add new item to storefront", async function () {
      const { createAd, fundAccounts} = await loadFixture(deployContractsFixcture);
      const { amountMinted, balances: [ sellerInitBal, ], accounts: [seller,] } = await fundAccounts();
      expect(sellerInitBal).to.equal(amountMinted);

      const { 
        data, 
        qty,
        pricePerItem,
        imgageLink,
        descriptn,
        categorySelector,
        sellerLocation } = await createAd(Category.VEHICLES);
      
      expect(data.length).to.equal(1);

      /**Then we can access data content at index 0 */
      const { 
        seller: sellerAddr, 
        info: { description, id, location, orders, priceLimit, quantity }, 
        meta : { category, uri }
      } = data[0];

      expect(qty).to.equal(bn(quantity.toString()).toNumber());
      expect(bn(id.toString()).toNumber()).to.equal(0);

      expect(bytesToString(description.toString())).to.equal(descriptn);
      expect(bytesToString(location)).to.equal(sellerLocation);
      expect(bytesToString(uri)).to.equal(imgageLink);
      expect(orders.length).to.equal(0);
      expect(BigInt(priceLimit.toString())).to.equal(pricePerItem);
      expect(sellerAddr.toString()).to.equal(seller.address);
      expect(categorySelector).to.equal(Number(category));
    });

    it("Should remove Item from StoreFront", async function () {
      const { createAd, removeItem, fundAccounts} = await loadFixture(deployContractsFixcture);
      const { accounts: [seller,] } = await fundAccounts();
      const { data: [data0,] } = await createAd(Category.VEHICLES);
      const { data: [data0After] } = await removeItem(bn(data0.info.id.toString()).toNumber());
      expect(data0.seller.toString()).to.be.eq(seller.address);
      expect(data0After.seller.toString()).to.be.eq(zeroAddress);
      expect(data0After.info.priceLimit.toString()).to.be.eq('0');
    });

    it("Should edit price successfully", async function () {
      const { createAd, editPrice, fundAccounts} = await loadFixture(deployContractsFixcture);
      await fundAccounts();
      const { data: [data0,] } = await createAd(Category.VEHICLES);
      const { data: [data0After], newPrice } = await editPrice(bn(data0.info.id.toString()).toNumber());
      expect(bn(newPrice.toString()).toString()).to.be.eq(bn(data0After.info.priceLimit.toString()).toString());
    });
    
    it("Should edit quantity successfully", async function () {
      const { createAd, editQuantity, fundAccounts} = await loadFixture(deployContractsFixcture);
      await fundAccounts();
      const { data: [data0,] } = await createAd(Category.VEHICLES);
      // console.log("Data0", data0.info.id.toString())
      const { data: [data0After], newQuantity} = await editQuantity(bn(data0.info.id.toString()).toNumber());
      expect(bn(newQuantity.toString()).toString()).to.be.eq(bn(data0After.info.quantity.toString()).toString());
    });

    it("Should successfully start order", async function () {
      const { createAd, placeOrder, fundAccounts} = await loadFixture(deployContractsFixcture);
      const { accounts: [, buyer] } = await fundAccounts();

      const { data: [data0,] } = await createAd(Category.PHONESNTABLETS);
      const { data: [data0After], commitment, reqQuantity, buyerOffer} = await placeOrder(bn(data0.info.id.toString()).toNumber());
      expect(data0After.info.orders.length).to.be.eq(1);
      const order0 = data0After.info.orders[0];
      expect(bn(order0.commitment.toString()).toString()).to.be.eq(commitment.toString());
      expect(order0.firstSigner).to.be.eq(zeroAddress);
      expect(order0.customer.toString()).to.be.eq(buyer.address);
      expect(order0.quantity.toString()).to.be.eq(reqQuantity.toString());
      expect(order0.offerPrice.toString()).to.be.eq(buyerOffer.toString());
      expect(bn(order0.stage.toString()).toNumber()).to.be.eq(StageSelector.COMMIT);
    });

    it("Seller should reject order", async function () {
      const { createAd, placeOrder, moveOrder, fundAccounts } = await loadFixture(deployContractsFixcture);
      const { accounts: [, buyer] } = await fundAccounts();

      const { data: [data0,] } = await createAd(Category.PHONESNTABLETS);
      const itemId = bn(data0.info.id.toString()).toNumber();
      const { data: dataAfterNegotiation } = await placeOrder(itemId);
      const orderId = bn(dataAfterNegotiation[0].info.orders.length - 1).toNumber();
      const { data: [dataAfterRejected]} = await moveOrder(itemId, orderId, StageSelector.REJECTED);
      expect(dataAfterRejected.info.orders[orderId].stage).to.be.eq(StageSelector.REJECTED);
    });

    it("Seller should accept order", async function () {
      const { createAd, placeOrder, moveOrder, fundAccounts } = await loadFixture(deployContractsFixcture);
      await fundAccounts();
      const { data: [data0,] } = await createAd(Category.FASHION);
      const itemId = bn(data0.info.id.toString()).toNumber();
      const { data: dataAfterNegotiation } = await placeOrder(itemId);
      const orderId = bn(dataAfterNegotiation[0].info.orders.length - 1).toNumber();
      const { data: [dataAfterRejected]} = await moveOrder(itemId, orderId, StageSelector.ACCEPTED);
      expect(dataAfterRejected.info.orders[orderId].stage).to.be.eq(StageSelector.ACCEPTED);
    });

    it("Status goods should be in transit", async function () {
      const { createAd, placeOrder, moveOrder, fundAccounts } = await loadFixture(deployContractsFixcture);
      await fundAccounts();
      const { data: [data0,] } = await createAd(Category.FASHION);
      const itemId = bn(data0.info.id.toString()).toNumber();
      const { data: dataAfterNegotiation } = await placeOrder(itemId);
      const orderId = bn(dataAfterNegotiation[0].info.orders.length - 1).toNumber();
      const { data: [dataAfterRejected]} = await moveOrder(itemId, orderId, StageSelector.INTRANSIT);
      expect(dataAfterRejected.info.orders[orderId].stage).to.be.eq(StageSelector.INTRANSIT);
    });

    it("Buyer should be able to cancel orders not in transit and delivered", async function () {
      const { createAd, placeOrder, moveOrder, fundAccounts, cancelOrder, sellerContract } = await loadFixture(deployContractsFixcture);
      await fundAccounts();
      const { data: [data0,] } = await createAd(Category.FASHION);
      const itemId = bn(data0.info.id.toString()).toNumber();
      const { data: dataAfterNegotiation } = await placeOrder(itemId);
      const orderId = bn(dataAfterNegotiation[0].info.orders.length - 1).toNumber();
      await moveOrder(itemId, orderId, StageSelector.ACCEPTED);
      const { data: [data_0,] } = await cancelOrder(itemId, orderId);
      expect(data_0.info.orders[orderId].stage).to.be.eq(StageSelector.CANCELLED);
    });

    it("Seller should deliver goods and get paid", async function () {
      const { createAd, placeOrder, getPayment, sellerContract, buyerContract, moveOrder, fundAccounts, confirmReceiptOfGoods } = await loadFixture(deployContractsFixcture);
      
      // Send testUSDT to participating accounts
      const { seller, buyer } = await fundAccounts();

      // Seller creates AD
      const { data: [data0,],} = await createAd(Category.FASHION);
      const itemId = bn(data0.info.id.toString()).toNumber();

      // Buyer creates an order
      const { data: dataAfterNegotiation, commitment, initBalOfBuyer, initBalOfSeller } = await placeOrder(itemId);
      const orderId = bn(dataAfterNegotiation[0].info.orders.length - 1).toNumber();

      // Buyer accepts the negotiation
      await moveOrder(itemId, orderId, StageSelector.ACCEPTED);
      // Seller get in touch with Buyer, and Buyer has agreed for Seller to deliver the 

      // Seller begins to move order to destination
      await moveOrder(itemId, orderId, StageSelector.INTRANSIT);

      /**
       * Seller delivered item successfully. When stage is moved to delivered, Seller
       * must sign confirmation document right there together with the buyer, and the 
       * trade will be finalized.
       */
      await moveOrder(itemId, orderId, StageSelector.DELIVERED);
      const { 
        dataAfter,
        uSDTBalOfBuyer,
        uSDTBalOfSeller
      } = await confirmReceiptOfGoods(itemId, orderId);
      await getPayment();
      expect(dataAfter[0].info.orders[orderId].firstSigner).to.be.eq(seller.address);
      expect(dataAfter[0].info.orders[orderId].customer).to.be.eq(buyer.address);
      expect(toBigInt(uSDTBalOfBuyer)).to.be.eq(toBigInt(initBalOfBuyer) - toBigInt(commitment.toString()));
      expect(toBigInt(uSDTBalOfSeller)).to.be.lte(toBigInt(initBalOfSeller) + toBigInt(commitment.toString()));
      
      await expect(moveOrder(itemId, orderId, StageSelector.ACCEPTED))
        .to.revertedWithCustomError(sellerContract, "OrderResolved");

      // await expect(placeOrder(itemId))
      //   .to.revertedWithCustomError(buyerContract, "OrderResolved");
    });
  });
  
  describe("Reverting Txns", function () {
    it("Seller should not be able to move order any further when rejected", async function () {
      const { createAd, placeOrder, moveOrder, fundAccounts, sellerContract } = await loadFixture(deployContractsFixcture);
      await fundAccounts();
      const { data: [data0,] } = await createAd(Category.BABIESNKIDS);
      const itemId = bn(data0.info.id.toString()).toNumber();
      const { data: dataAfterNegotiation } = await placeOrder(itemId);
      const orderId = bn(dataAfterNegotiation[0].info.orders.length - 1).toNumber();
      await moveOrder(itemId, orderId, StageSelector.REJECTED);
      expect(await moveOrder(itemId, orderId, StageSelector.ACCEPTED))
        .to.revertedWithCustomError(sellerContract, "OrderResolved")
    })

    it("If goods in transit, buyer should not be able to edit order", async function () {
      const { createAd, placeOrder, moveOrder, fundAccounts, editOrder, sellerContract } = await loadFixture(deployContractsFixcture);
      await fundAccounts();
      const { data: [data0,] } = await createAd(Category.FASHION);
      const itemId = bn(data0.info.id.toString()).toNumber();
      const { data: dataAfterNegotiation } = await placeOrder(itemId);
      const orderId = bn(dataAfterNegotiation[0].info.orders.length - 1).toNumber();
      await moveOrder(itemId, orderId, StageSelector.INTRANSIT);
      await expect(editOrder(itemId, orderId))
        .to.revertedWith("Cannot cancel order at this time");
    });

    it("If goods in transit, buyer should not be able to cancel order", async function () {
      const { createAd, placeOrder, moveOrder, fundAccounts, cancelOrder, sellerContract } = await loadFixture(deployContractsFixcture);
      await fundAccounts();
      const { data: [data0,] } = await createAd(Category.FASHION);
      const itemId = bn(data0.info.id.toString()).toNumber();
      const { data: dataAfterNegotiation } = await placeOrder(itemId);
      const orderId = bn(dataAfterNegotiation[0].info.orders.length - 1).toNumber();
      await moveOrder(itemId, orderId, StageSelector.INTRANSIT);
      await expect(cancelOrder(itemId, orderId))
        .to.revertedWith("Cannot cancel order at this time");
    });

  });

  describe("Events", function () {
    // it("Should emit an event on withdrawals", async function () {
    //   const { lock, unlockTime, lockedAmount } = await loadFixture(
    //     deployCoinPickerFixture
    //   );

    //   await time.increaseTo(unlockTime);

    //   await expect(lock.withdraw())
    //     .to.emit(lock, "Withdrawal")
    //     .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
    // });
  });
  
})


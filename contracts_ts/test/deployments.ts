import { ethers } from "hardhat";
import type { Address, Buyer, FactoryContract, RoleBasedContract, Seller, Signer, Signers, TestUSDTContract } from "./types";
import { formatAddr } from "./utilities";

/**
 * Deploys and return an instance of the RoleBasedManager contract
 * @param deployer : Deployer address
 * @returns : Contract instance
 */
export async function deployRoleBasedManager(deployer: Signer) : Promise<RoleBasedContract> {
  const RoleBasedManager = await ethers.getContractFactory("RoleBased");
  return (await RoleBasedManager.connect(deployer).deploy());
}

/**
 * Deploys and return an instance of the Buyer contract.
 * @param deployer : Deployer address
 * @returns Contract instance
 */
export async function deployBuyerContract(roleBasedAddr: Address, factory: Address, testUSDT: Address, deployer: Signer) : Promise<Buyer> {
  const Buyer = await ethers.getContractFactory("BuyerV1");
  return (await Buyer.connect(deployer).deploy(factory, testUSDT, roleBasedAddr));
}

/**
 * Deploys and return an instance of the Seller contract.
 * @param deployer : Deployer address
 * @returns Contract instance
 */
export async function deploySellerContract(roleBasedAddr: Address, factory: Address, buyerContractAddr: Address, testUSDT: Address, deployer: Signer) : Promise<Seller> {
  const Buyer = await ethers.getContractFactory("SellerV1");
  return (await Buyer.connect(deployer).deploy(factory, testUSDT, buyerContractAddr, roleBasedAddr));
}

/**
 * Deploys and return an instance of the TestUSDT contract
 * @param deployer : Deployer address
 * @returns Contract instance
 */
export async function deployTestUSDT(deployer: Signer) :Promise< TestUSDTContract> {
  const AssetMgr = await ethers.getContractFactory("TestUSDT");
  return (await AssetMgr.connect(deployer).deploy());
}

/**
 * Deploy public router
 *
 * @param deployer : Deployer.
 * @param feeTo : FeeReceiver contract.
 * @param roleManager : RoleManager contract.
 * @returns Contract instance.
 */
export async function deployFactory(feeTo: Address, roleManager: Address, deployer: Signer) : Promise<FactoryContract> {
  const Factory = await ethers.getContractFactory("Factory");
  return (await Factory.connect(deployer).deploy(feeTo, roleManager));
}

export async function deployContracts() {
  const { getSigners } = ethers;
  const [deployer, alc1, alc2, alc3, routeTo, feeTo, signer1, signer2, signer3, devAddr ] = await getSigners();
  const roleManager = await deployRoleBasedManager(deployer);
  const roleManagerAddr = formatAddr(await roleManager.getAddress());

  const tUSDT = await deployTestUSDT(deployer);
  const testUSDTAddr = formatAddr(await tUSDT.getAddress());

  const factory = await deployFactory(formatAddr(feeTo.address), formatAddr(roleManagerAddr), deployer);
  const factoryAddr = formatAddr(await factory.getAddress());

  const buyer = await deployBuyerContract(roleManagerAddr, factoryAddr, testUSDTAddr, deployer);
  const buyerAddr = formatAddr(await buyer.getAddress());

  // const strategy = await deployStrategy(formatAddr(roleManagerAddr), deployer);
  const seller = await deploySellerContract(roleManagerAddr, factoryAddr, buyerAddr, testUSDTAddr, deployer);
  const sellerAddr = await seller.getAddress();

  await roleManager.connect(deployer).setPermission([factoryAddr, sellerAddr, buyerAddr, roleManagerAddr]);

  return {
    roleManagerAddr,
    buyer,
    buyerAddr,
    seller,
    sellerAddr,
    factory,
    tUSDT,
    factoryAddr,
    signers: { deployer, alc1, alc2, alc3, routeTo, feeTo, signer1, signer2, signer3, devAddr }
  };
}

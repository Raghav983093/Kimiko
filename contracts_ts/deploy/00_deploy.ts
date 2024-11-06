import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { config } from "dotenv";

config()

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
	const {deploy, execute } = deployments;
	const {deployer, feeTo } = await getNamedAccounts();

  /**
   * Deploy RoleBased Manager
   */
  const roleManager = await deploy("RoleBased", {
    from: deployer,
    args: [],
    log: true,
  });
  console.log(`RoleBased Manager deployed to: ${roleManager.address}`);

  /**
 * Deploy Test Asset
 */
  const tUSDT = await deploy("TestUSDT", {
    from: deployer,
    args: [],
    log: true,
  });
  console.log(`Test Asset deployed to: ${tUSDT.address}`);

  const factory = await deploy("Factory", {
    from: deployer,
    args: [feeTo, roleManager.address],
    log: true,
  });
  console.log(`Factory deployed to: ${factory.address}`);

  const buyer_contract = await deploy("BuyerV1", {
    from: deployer,
    args: [factory.address, tUSDT.address, roleManager.address],
    log: true,
  });
  console.log(`Buyer contract deployed to: ${buyer_contract.address}`);

  const seller_contract = await deploy("SellerV1", {
    from: deployer,
    args: [factory.address, tUSDT.address, buyer_contract.address, roleManager.address],
    log: true,
  });
  console.log(`Seller contract deployed to: ${seller_contract.address}`);
  
  await execute("RoleBased", {from: deployer}, "setPermission", [factory.address, buyer_contract.address, seller_contract.address, roleManager.address]);
};

export default func;

func.tags = ["RoleBased", "TestUSDT", "Buyer", "Seller", "Factory"];
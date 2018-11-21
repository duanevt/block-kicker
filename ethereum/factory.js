import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  // '0x93129fC018aCD43908f6fdD4DdF148DB74EC33D5'
  '0x429641D13d9D5F77d23BCC3810ce2D5ba2527E34'
);

export default instance;

import PocketBase from 'pocketbase';
import config from '../../config';

class SingletonPocketBase {
  static instance: PocketBase = new PocketBase(config.API_HOST);

  private constructor() {}

  static getInstance(): PocketBase {
    return SingletonPocketBase.instance;
  }
}

export default SingletonPocketBase.getInstance();

import Config from './Config';
import FetchService from './FetchService';
import {
  CreateMerchCollectionRequest,
  EditMerchCollectionRequest,
  CreateMerchItemRequest,
  EditMerchItemRequest,
  PlaceMerchOrderRequest,
  VerifyMerchOrderRequest,
  FulfillMerchOrderRequest,
  RescheduleOrderPickupRequest,
  CreateMerchItemOptionRequest,
  CreateOrderPickupEventRequest,
  EditOrderPickupEventRequest,
  GetCartRequest,
} from './ApiRequests';
import {
  GetOneMerchCollectionResponse,
  GetAllMerchCollectionsResponse,
  CreateMerchCollectionResponse,
  EditMerchCollectionResponse,
  GetOneMerchItemResponse,
  CreateMerchItemResponse,
  EditMerchItemResponse,
  GetOneMerchOrderResponse,
  GetMerchOrdersResponse,
  PlaceMerchOrderResponse,
  FulfillMerchOrderResponse,
  CreateMerchItemOptionResponse,
  CreateOrderPickupEventResponse,
  GetOrderPickupEventsResponse,
  GetCartResponse,
  EditOrderPickupEventResponse,
  UpdateMerchPhotoResponse,
  CompleteOrderPickupEventResponse,
  GetOrderPickupEventResponse,
} from './ApiResponses';

class MerchStoreRoutes {
  fetchService: FetchService;

  constructor(fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  // @Get('/merch/collection/:uuid')
  getOneMerchCollection = (uuid: string): Promise<GetOneMerchCollectionResponse> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('fetchCollection: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.collection}/${uuid}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/merch/collection')
  getAllMerchCollections = (): Promise<GetAllMerchCollectionsResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.collection}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/collection')
  createMerchCollection = (request: CreateMerchCollectionRequest): Promise<CreateMerchCollectionResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.collection}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Patch('/merch/collection/:uuid')
  editMerchCollection = (uuid: string, request: EditMerchCollectionRequest): Promise<EditMerchCollectionResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.collection}/${uuid}`;

      this.fetchService
        .fetch(url, 'PATCH', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Delete('/merch/collection/:uuid')
  deleteMerchCollection = (uuid: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('deleteCollection: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.collection}/${uuid}`;

      this.fetchService
        .fetch(url, 'DELETE', 'json', {
          requiresAuthorization: true,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/merch/item/:uuid')
  getOneMerchItem = (uuid: string): Promise<GetOneMerchItemResponse> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.item}/${uuid}`;
      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/item')
  createMerchItem = (request: CreateMerchItemRequest): Promise<CreateMerchItemResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.item}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Patch('/merch/item/:uuid')
  editMerchItem = (uuid: string, request: EditMerchItemRequest): Promise<EditMerchItemResponse> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('editItem: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.item}/${uuid}`;

      this.fetchService
        .fetch(url, 'PATCH', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Delete('/merch/item/:uuid')
  deleteMerchItem = (uuid: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('deleteItem: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.item}/${uuid}`;

      this.fetchService
        .fetch(url, 'DELETE', 'json', {
          requiresAuthorization: true,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/item/picture/:uuid')
  updateMerchPhoto = (uuid: string, formdata: FormData): Promise<UpdateMerchPhotoResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL + Config.store.itemPicture}/${uuid}`;

      this.fetchService
        .fetch(url, 'POST', 'image', {
          requiresAuthorization: true,
          payload: formdata,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/option/:uuid')
  createMerchItemOption = (uuid: string, request: CreateMerchItemOptionRequest): Promise<CreateMerchItemOptionResponse> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('createItemOption: Missing required uuid in request.'));
      }

      if (!request) {
        reject(new Error('createItemOption: Missing required option in request.'));
      }

      const url = `${Config.API_URL}${Config.store.option}/${uuid}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Delete('/merch/option/:uuid')
  deleteMerchItemOption = (uuid: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('deleteItemOption: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.option}/${uuid}`;

      this.fetchService
        .fetch(url, 'DELETE', 'json', {
          requiresAuthorization: true,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/merch/order/:uuid')
  getOneMerchOrder = (uuid: string): Promise<GetOneMerchOrderResponse> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('fetchItem: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.order}/${uuid}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/merch/orders/all')
  getMerchOrdersForAllUsers = (): Promise<GetMerchOrdersResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.orders}/all`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/merch/orders')
  getMerchOrdersForCurrentUser = (): Promise<GetMerchOrdersResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.orders}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/order')
  placeMerchOrder = (request: PlaceMerchOrderRequest): Promise<PlaceMerchOrderResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.order}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/order/verification')
  verifyMerchOrder = (request: VerifyMerchOrderRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.order}/verification`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/order/:uuid/reschedule')
  rescheduleOrderPickup = (uuid: string, request: RescheduleOrderPickupRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('rescheduleOrder: Missing required uuid in request.'));
      }

      if (!request) {
        reject(new Error('rescheduleOrder: Missing required request.'));
      }

      const url = `${Config.API_URL}${Config.store.order}/${uuid}/reschedule`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/order/:uuid/cancel')
  cancelMerchOrder = (uuid: string): Promise<any> /* TODO: Add Promise Type */ => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('cancelOrder: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.order}/${uuid}/cancel`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/order/:uuid/fulfill')
  fulfillMerchOrderItems = (uuid: string, request: FulfillMerchOrderRequest): Promise<FulfillMerchOrderResponse> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('fulfillOrder: Missing required uuid in request.'));
      }

      if (!request) {
        reject(new Error('fulfillOrder: Missing required request.'));
      }

      const url = `${Config.API_URL}${Config.store.order}/${uuid}/fulfill`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/order/cleanup')
  cancelAllPendingMerchOrders = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.order}/cleanup`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/merch/order/pickup/past')
  getPastPickupEvents = (): Promise<GetOrderPickupEventsResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.pickup.past}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/merch/order/pickup/future')
  getFuturePickupEvents = (): Promise<GetOrderPickupEventsResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.store.pickup.future}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/merch/order/pickup/:uuid')
  getOnePickupEvent = (uuid: string): Promise<GetOrderPickupEventResponse> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('fetchPickupEvent: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.pickup.single}/${uuid}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/order/pickup')
  createPickupEvent = (request: CreateOrderPickupEventRequest): Promise<CreateOrderPickupEventResponse> => {
    return new Promise((resolve, reject) => {
      if (!request) {
        reject(new Error('createPickupEvent: Missing required request.'));
      }

      const url = `${Config.API_URL}${Config.store.pickup.single}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Patch('/merch/order/pickup/:uuid')
  editPickupEvent = (uuid: string, request: EditOrderPickupEventRequest): Promise<EditOrderPickupEventResponse> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('editPickupEvent: Missing required uuid in request.'));
      }

      if (!request) {
        reject(new Error('editPickupEvent: Missing required request.'));
      }

      const url = `${Config.API_URL}${Config.store.pickup.single}/${uuid}`;

      this.fetchService
        .fetch(url, 'PATCH', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Delete('/merch/order/pickup/:uuid')
  deletePickupEvent = (uuid: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('deletePickupEvent: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.order}/pickup/${uuid}`;

      this.fetchService
        .fetch(url, 'DELETE', 'json', {
          requiresAuthorization: true,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/order/pickup/:uuid/cancel')
  cancelPickupEvent = (uuid: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('cancelPickupEvent: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.order}/pickup/${uuid}/cancel`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Post('/merch/order/pickup/:uuid/complete')
  completePickupEvent = (uuid: string): Promise<CompleteOrderPickupEventResponse> => {
    return new Promise((resolve, reject) => {
      if (!uuid) {
        reject(new Error('completePickupEvent: Missing required uuid in request.'));
      }

      const url = `${Config.API_URL}${Config.store.order}/pickup/${uuid}/complete`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
          requiresAuthorization: true,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/merch/cart')
  getCartItems = (request: GetCartRequest): Promise<GetCartResponse> => {
    return new Promise((resolve, reject) => {
      if (!request) {
        reject(new Error('getCart: Missing required request.'));
      }

      const url = `${Config.API_URL}${Config.store.cart}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
          requiresAuthorization: true,
          payload: JSON.stringify(request),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default MerchStoreRoutes;

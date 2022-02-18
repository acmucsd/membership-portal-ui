import Config from '../config';
import fetchService from './fetchService';
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

// @Get('/merch/collection/:uuid')
export const getOneMerchCollection = (uuid: string): Promise<GetOneMerchCollectionResponse> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('fetchCollection: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;

    fetchService(url, 'GET', 'json', {
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
export const getAllMerchCollections = (): Promise<GetAllMerchCollectionsResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.collection}`;

    fetchService(url, 'GET', 'json', {
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
export const createMerchCollection = (request: CreateMerchCollectionRequest): Promise<CreateMerchCollectionResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.collection}`;

    fetchService(url, 'POST', 'json', {
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
export const editMerchCollection = (uuid: string, request: EditMerchCollectionRequest): Promise<EditMerchCollectionResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;

    fetchService(url, 'PATCH', 'json', {
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
export const deleteMerchCollection = (uuid: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('deleteCollection: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;

    fetchService(url, 'DELETE', 'json', {
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
export const getOneMerchItem = (uuid: string): Promise<GetOneMerchItemResponse> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('fetchItem: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.item}/${uuid}`;
    fetchService(url, 'GET', 'json', {
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
export const createMerchItem = (request: CreateMerchItemRequest): Promise<CreateMerchItemResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.item}`;

    fetchService(url, 'POST', 'json', {
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
export const editMerchItem = (uuid: string, request: EditMerchItemRequest): Promise<EditMerchItemResponse> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('editItem: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.item}/${uuid}`;

    fetchService(url, 'PATCH', 'json', {
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
export const deleteMerchItem = (uuid: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('deleteItem: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.item}/${uuid}`;

    fetchService(url, 'DELETE', 'json', {
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
export const updateMerchPhoto = (uuid: string, formdata: FormData): Promise<UpdateMerchPhotoResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL + Config.routes.store.itemPicture}/${uuid}`;

    fetchService(url, 'POST', 'image', {
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
export const createMerchItemOption = (uuid: string, request: CreateMerchItemOptionRequest): Promise<CreateMerchItemOptionResponse> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('createItemOption: Missing required uuid in request.'));
    }

    if (!request) {
      reject(new Error('createItemOption: Missing required option in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.option}/${uuid}`;

    fetchService(url, 'POST', 'json', {
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
export const deleteMerchItemOption = (uuid: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('deleteItemOption: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.option}/${uuid}`;

    fetchService(url, 'DELETE', 'json', {
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
export const getOneMerchOrder = (uuid: string): Promise<GetOneMerchOrderResponse> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('fetchItem: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}`;

    fetchService(url, 'GET', 'json', {
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
export const getMerchOrdersForAllUsers = (): Promise<GetMerchOrdersResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.orders}/all`;

    fetchService(url, 'GET', 'json', {
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
export const getMerchOrdersForCurrentUser = (): Promise<GetMerchOrdersResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.orders}`;

    fetchService(url, 'GET', 'json', {
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
export const placeMerchOrder = (request: PlaceMerchOrderRequest): Promise<PlaceMerchOrderResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.order}`;

    fetchService(url, 'POST', 'json', {
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
export const verifyMerchOrder = (request: VerifyMerchOrderRequest): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.order}/verification`;

    fetchService(url, 'POST', 'json', {
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
export const rescheduleOrderPickup = (uuid: string, request: RescheduleOrderPickupRequest): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('rescheduleOrder: Missing required uuid in request.'));
    }

    if (!request) {
      reject(new Error('rescheduleOrder: Missing required request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}/reschedule`;

    fetchService(url, 'POST', 'json', {
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
export const cancelMerchOrder = (uuid: string): Promise<any> /* TODO: Add Promise Type */ => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('cancelOrder: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}/cancel`;

    fetchService(url, 'POST', 'json', {
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
export const fulfillMerchOrderItems = (uuid: string, request: FulfillMerchOrderRequest): Promise<FulfillMerchOrderResponse> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('fulfillOrder: Missing required uuid in request.'));
    }

    if (!request) {
      reject(new Error('fulfillOrder: Missing required request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}/fulfill`;

    fetchService(url, 'POST', 'json', {
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
export const cancelAllPendingMerchOrders = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.order}/cleanup`;

    fetchService(url, 'POST', 'json', {
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
export const getPastPickupEvents = (): Promise<GetOrderPickupEventsResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.pickup.past}`;

    fetchService(url, 'GET', 'json', {
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
export const getFuturePickupEvents = (): Promise<GetOrderPickupEventsResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.store.pickup.future}`;

    fetchService(url, 'GET', 'json', {
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
export const getOnePickupEvent = (uuid: string): Promise<GetOrderPickupEventResponse> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('fetchPickupEvent: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.pickup.single}/${uuid}`;

    fetchService(url, 'GET', 'json', {
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
export const createPickupEvent = (request: CreateOrderPickupEventRequest): Promise<CreateOrderPickupEventResponse> => {
  return new Promise((resolve, reject) => {
    if (!request) {
      reject(new Error('createPickupEvent: Missing required request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.pickup.single}`;

    fetchService(url, 'POST', 'json', {
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
export const editPickupEvent = (uuid: string, request: EditOrderPickupEventRequest): Promise<EditOrderPickupEventResponse> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('editPickupEvent: Missing required uuid in request.'));
    }

    if (!request) {
      reject(new Error('editPickupEvent: Missing required request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.pickup.single}/${uuid}`;

    fetchService(url, 'PATCH', 'json', {
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
export const deletePickupEvent = (uuid: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('deletePickupEvent: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${uuid}`;

    fetchService(url, 'DELETE', 'json', {
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
export const cancelPickupEvent = (uuid: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('cancelPickupEvent: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${uuid}/cancel`;

    fetchService(url, 'POST', 'json', {
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
export const completePickupEvent = (uuid: string): Promise<CompleteOrderPickupEventResponse> => {
  return new Promise((resolve, reject) => {
    if (!uuid) {
      reject(new Error('completePickupEvent: Missing required uuid in request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${uuid}/complete`;

    fetchService(url, 'POST', 'json', {
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
export const getCartItems = (request: GetCartRequest): Promise<GetCartResponse> => {
  return new Promise((resolve, reject) => {
    if (!request) {
      reject(new Error('getCart: Missing required request.'));
    }

    const url = `${Config.API_URL}${Config.routes.store.cart}`;

    fetchService(url, 'GET', 'json', {
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

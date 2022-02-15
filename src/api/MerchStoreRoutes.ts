import Config from '../config';
import { fetchService } from '../utils';
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
export const fetchCollection = async (uuid: string) => {
  if (!uuid) {
    throw new Error('fetchCollection: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetOneMerchCollectionResponse) => {
      return data.collection;
    })
    .catch((error) => {
      throw error;
    });
};

// @Get('/merch/collection')
export const fetchCollections = async () => {
  const url = `${Config.API_URL}${Config.routes.store.collection}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetAllMerchCollectionsResponse) => {
      return data.collections;
    })
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/collection')
export const createCollection = (request: CreateMerchCollectionRequest) => {
  const url = `${Config.API_URL}${Config.routes.store.collection}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: CreateMerchCollectionResponse) => {
      return data.collection;
    })
    .catch((error) => {
      throw error;
    });
};

// @Patch('/merch/collection/:uuid')
export const editCollection = (uuid: string, request: EditMerchCollectionRequest) => {
  const url = `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;

  fetchService(url, 'PATCH', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: EditMerchCollectionResponse) => {
      return data.collection;
    })
    .catch((error) => {
      throw error;
    });
};

// @Delete('/merch/collection/:uuid')
export const deleteCollection = async (uuid: string) => {
  if (!uuid) {
    throw new Error('deleteCollection: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.collection}/${uuid}`;

  fetchService(url, 'DELETE', 'json', {
    requiresAuthorization: true,
  })
    .then(() => {})
    .catch((error) => {
      throw error;
    });
};

// @Get('/merch/item/:uuid')
export const fetchItem = async (uuid: string) => {
  if (!uuid) {
    throw new Error('fetchItem: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.item}/${uuid}`;
  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetOneMerchItemResponse) => {
      return data.item;
    })
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/item')
export const createItem = async (request: CreateMerchItemRequest) => {
  const url = `${Config.API_URL}${Config.routes.store.item}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: CreateMerchItemResponse) => {
      return data.item;
    })
    .catch((error) => {
      throw error;
    });
};

// @Patch('/merch/item/:uuid')
export const editItem = async (uuid: string, request: EditMerchItemRequest) => {
  if (!uuid) {
    throw new Error('editItem: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.item}/${uuid}`;

  fetchService(url, 'PATCH', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: EditMerchItemResponse) => {
      return data.item;
    })
    .catch((error) => {
      throw error;
    });
};

// @Delete('/merch/item/:uuid')
export const deleteItem = async (uuid: string) => {
  if (!uuid) {
    throw new Error('deleteItem: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.item}/${uuid}`;

  fetchService(url, 'DELETE', 'json', {
    requiresAuthorization: true,
  })
    .then(() => {})
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/item/picture/:uuid')
export const setItemPicture = (uuid: string, formdata: FormData) => {
  const url = `${Config.API_URL + Config.routes.store.itemPicture}/${uuid}`;

  fetchService(url, 'POST', 'image', {
    requiresAuthorization: true,
    payload: formdata,
  })
    .then((data: UpdateMerchPhotoResponse) => {
      return data.item;
    })
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/option/:uuid')
export const createItemOption = async (uuid: string, request: CreateMerchItemOptionRequest) => {
  if (!uuid) {
    throw new Error('createItemOption: Missing required uuid in request.');
  }

  if (!request) {
    throw new Error('createItemOption: Missing required option in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.option}/${uuid}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: CreateMerchItemOptionResponse) => {
      return data.option;
    })
    .catch((error) => {
      throw error;
    });
};

// @Delete('/merch/option/:uuid')
export const deleteItemOption = async (uuid: string) => {
  if (!uuid) {
    throw new Error('deleteItemOption: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.option}/${uuid}`;

  fetchService(url, 'DELETE', 'json', {
    requiresAuthorization: true,
  })
    .then(() => {})
    .catch((error) => {
      throw error;
    });
};

// @Get('/merch/order/:uuid')
export const fetchOrder = async (uuid: string) => {
  if (!uuid) {
    throw new Error('fetchItem: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetOneMerchOrderResponse) => {
      return data.order;
    })
    .catch((error) => {
      throw error;
    });
};

// @Get('/merch/orders/all')
export const fetchAllOrders = async () => {
  const url = `${Config.API_URL}${Config.routes.store.orders}/all`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetMerchOrdersResponse) => {
      return data.orders;
    })
    .catch((error) => {
      throw error;
    });
};

// @Get('/merch/orders')
export const fetchOrders = async () => {
  const url = `${Config.API_URL}${Config.routes.store.orders}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetMerchOrdersResponse) => {
      return data.orders;
    })
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/order')
export const createOrder = async (request: PlaceMerchOrderRequest) => {
  const url = `${Config.API_URL}${Config.routes.store.order}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: PlaceMerchOrderResponse) => {
      return data.order;
    })
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/order/verification')
export const verifyOrder = async (request: VerifyMerchOrderRequest) => {
  const url = `${Config.API_URL}${Config.routes.store.order}/verification`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then(() => {})
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/order/:uuid/reschedule')
export const rescheduleOrder = async (uuid: string, request: RescheduleOrderPickupRequest) => {
  if (!uuid) {
    throw new Error('rescheduleOrder: Missing required uuid in request.');
  }

  if (!request) {
    throw new Error('rescheduleOrder: Missing required request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}/reschedule`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then(() => {})
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/order/:uuid/cancel')
export const cancelOrder = async (uuid: string) => {
  if (!uuid) {
    throw new Error('cancelOrder: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}/cancel`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
  })
    .then((data /* TODO: Add Type */) => {
      return data.order;
    })
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/order/:uuid/fulfill')
export const fulfillOrder = async (uuid: string, request: FulfillMerchOrderRequest) => {
  if (!uuid) {
    throw new Error('fulfillOrder: Missing required uuid in request.');
  }

  if (!request) {
    throw new Error('fulfillOrder: Missing required request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.order}/${uuid}/fulfill`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: FulfillMerchOrderResponse) => {
      return data.order;
    })
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/order/cleanup')
export const cancelAllOrders = async () => {
  const url = `${Config.API_URL}${Config.routes.store.order}/cleanup`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
  })
    .then(() => {})
    .catch((error) => {
      throw error;
    });
};

// @Get('/merch/order/pickup/past')
export const fetchPastPickupEvents = async () => {
  const url = `${Config.API_URL}${Config.routes.store.pickup.past}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetOrderPickupEventsResponse) => {
      return data.pickupEvents;
    })
    .catch((error) => {
      throw error;
    });
};

// @Get('/merch/order/pickup/future')
export const fetchFuturePickupEvents = async () => {
  const url = `${Config.API_URL}${Config.routes.store.pickup.future}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetOrderPickupEventsResponse) => {
      return data.pickupEvents;
    })
    .catch((error) => {
      throw error;
    });
};

// @Get('/merch/order/pickup/:uuid')
export const fetchPickupEvent = async (uuid: string) => {
  if (!uuid) {
    throw new Error('fetchPickupEvent: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.pickup.single}/${uuid}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetOrderPickupEventResponse) => {
      return data.pickupEvent;
    })
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/order/pickup')
export const createPickupEvent = async (request: CreateOrderPickupEventRequest) => {
  if (!request) {
    throw new Error('createPickupEvent: Missing required request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.pickup.single}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: CreateOrderPickupEventResponse) => {
      return data.pickupEvent;
    })
    .catch((error) => {
      throw error;
    });
};

// @Patch('/merch/order/pickup/:uuid')
export const editPickupEvent = async (uuid: string, request: EditOrderPickupEventRequest) => {
  if (!uuid) {
    throw new Error('editPickupEvent: Missing required uuid in request.');
  }

  if (!request) {
    throw new Error('editPickupEvent: Missing required request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.pickup.single}/${uuid}`;

  fetchService(url, 'PATCH', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: EditOrderPickupEventResponse) => {
      return data.pickupEvent;
    })
    .catch((error) => {
      throw error;
    });
};

// @Delete('/merch/order/pickup/:uuid')
export const deletePickupEvent = async (uuid: string) => {
  if (!uuid) {
    throw new Error('deletePickupEvent: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${uuid}`;

  fetchService(url, 'DELETE', 'json', {
    requiresAuthorization: true,
  })
    .then(() => {})
    .catch((error) => {
      throw error;
    });
};

// @Post('/merch/order/pickup/:uuid/cancel')
export const cancelPickupEvent = async (uuid: string) => {
  if (!uuid) {
    throw new Error('deletePickupEvent: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${uuid}/cancel`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
  });
};

// @Post('/merch/order/pickup/:uuid/complete')
export const completePickupEvent = async (uuid: string) => {
  if (!uuid) {
    throw new Error('completePickupEvent: Missing required uuid in request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.order}/pickup/${uuid}/complete`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
  })
    .then((data: CompleteOrderPickupEventResponse) => {
      return data.orders;
    })
    .catch((error) => {
      throw error;
    });
};

// @Get('/merch/cart')
export const getCart = async (request: GetCartRequest) => {
  if (!request) {
    throw new Error('getCart: Missing required request.');
  }

  const url = `${Config.API_URL}${Config.routes.store.cart}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: GetCartResponse) => {
      return data.cart;
    })
    .catch((error) => {
      throw error;
    });
};

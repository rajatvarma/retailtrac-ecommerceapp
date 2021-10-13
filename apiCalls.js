const BASE_URL = 'http://pvanamuat.retailtrac360.com:8080/eComWS/'

export const categoriesURL = BASE_URL + 'rest/EcomInventory/allCategorywithSearchText/?search_text'

export const productByCategoryURL = BASE_URL + 'rest/EcomInventory/ecommerceItemsBasedOnParentCategory'

export const getCustomerOrdersURL = BASE_URL + 'rest/EcomSales/EcomGeTotalSalesInfo'

export const getOrderDetailsURL = BASE_URL + 'rest/EcomSales/ezPOZListAllItemsByInvoiceCode'

export const validateOrderStatusURL = BASE_URL + 'rest/ecomValidate/getEcomPaymentEnquiryResponse'


export const getForgotPasswordOTP = BASE_URL + 'rest/EcomCustomer/ecomCreateOTPForMobileNumber'

export const loginURL = BASE_URL + 'rest/EcomCustomer/ecomLoginCheck'

export const resetPasswordURL = BASE_URL + 'rest/EcomCustomer/ecomResetPWD'

export const registerOTPURL = BASE_URL + 'rest/EcomCustomer/eCommerceSendOTPJSON'

export const userRegistrationURL = BASE_URL + 'rest/EcomCustomer/verifyOTPInsertCsutomers'

export const getUserAddressesURL = BASE_URL + 'rest/EcomSales/EcomGetDeliveryAddresses'

export const addUserAddressURL = BASE_URL + 'rest/EcomCustomer/ecomInsert_CustomerDeliveryAddresses'

export const editAccountURL = BASE_URL + 'rest/EcomCustomer/ecomUpdate_Customers'


export const getPaymentDataURL = BASE_URL + 'rest/EcomInventory/getPaymentGatewayProperties'

export const raiseSaleURL = BASE_URL + 'rest/EcomSales/ecommerceValidatePincode'

export const getPaymentTokenURL = 'http://pvanam.retailtrac360.com:8080/generateTokendIDForAndroid'

export const createSalesOrderURL = BASE_URL + 'rest/EcomSales/ecommerceInsert_salesOrderData'
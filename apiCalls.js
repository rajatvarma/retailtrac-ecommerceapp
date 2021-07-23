const BASE_URL = 'http://pvanam.retailtrac360.com:8080/eComWS/'

export const categoriesURL = BASE_URL + 'rest/EcomInventory/allCategorywithSearchText/?search_text'

export const productByCategoryURL = BASE_URL + 'rest/EcomInventory/ecommerceItemsBasedOnParentCategory'

export const getCustomerOrdersURL = BASE_URL + 'rest/EcomSales/EcomGeTotalSalesInfo'

export const getOrderDetailsURL = BASE_URL + 'rest/EcomSales/ezPOZListAllItemsByInvoiceCode'

export const validateOrderStatusURL = BASE_URL + 'rest/ecomValidate/getEcomPaymentEnquiryResponse'


export const getForgotPasswordOTP = BASE_URL + 'rest/EcomCustomer/ecomcreateOTPSendMailMsg'

export const loginURL = BASE_URL + 'rest/EcomCustomer/ecomLoginCheck'

export const resetPasswordURL = BASE_URL + 'rest/EcomCustomer/ecomResetPWD'

export const registerOTPURL = BASE_URL + 'rest/EcomCustomer/eCommerceSendOTP'

export const userRegistrationURL = BASE_URL + 'rest/EcomCustomer/verifyOTPInsertCsutomers'



export const getPaymentDataURL = BASE_URL + 'rest/EcomInventory/getPaymentGatewayProperties'

export const raiseSaleURL = BASE_URL + 'rest/EcomSales/ecommerceValidatePincode'

export const getPaymentTokenURL = 'http://pvanam.retailtrac360.com:8080/generateTokendIDForAndroid'
import axios from 'axios'
import querystring from 'querystring'
import { encryptForPayment, generateCheckSum } from './algorithms'

const BASE_URL = 'http://pvanam.retailtrac360.com:8080/MergedWebservicesFMCG/'

const getPaymentData = async () => {
    let values = {}
    await axios.get('http://pvanam.retailtrac360.com:8080/MergedWebservicesFMCG/rest/EcomInventory/getPaymentGatewayProperties')
    .then(response => {
        // console.log(response.data.data)
        if (typeof(response) === 'object') {
            for (let index = 0; index < response.data.data.length; index++) {
                const item = response.data.data[index]
                values[item['url_name']] = item['url_values']
            }   
        }
    })
   
    return values
}   

export const checkoutHandler = async (user, cart, cartTotal) => {

    let rsp = {}

    let itemQuantites = ""
    let itemCodes = ""
    let itemCost = ""
    let totalItemCount = 0
    let salesCode

    console.log('Starting...')

    cart.forEach(item => {
        itemCodes = itemCodes + `${item.item_code}:`
        itemQuantites = itemQuantites + `${item.cart_quantity}:`
        totalItemCount = totalItemCount + item.cart_quantity
        itemCost = itemCost + `${item.sell_price}:`
    });

    const url = 'rest/EcomSales/ecommerceValidatePincode'
    
    var data = querystring.stringify({
        'line1': user.addressLine1,
        'line2': `${user.addressLine1}_${user.addressLine2}_${user.city}`,
        'mob': user.telephone1,
        'item_list': itemCodes,
        'item_quant': itemQuantites,
        'pin_code': user.pincode,
        'code': '',
        'created_by': 'mobile',
        'longitude': '',
        'latitude': '',
        'delivery_type': 'regular',
        'payment_mode': '',
        'total_amount': cartTotal,
        'item_cost': itemCost,
        'delivery_date': '15/07/2021',
        'location': 'PrakruthiVanam',
        'temp_id': Date.now(),
        'delivery_details_id': '34',
        'address': user.addressLine1,
        'freight': 50*totalItemCount,
        'customer_id': user.customer_id,
        'customer_name': user.customer_name,
        'city': user.city,
        'name': user.customer_id
    });

    try {
        await axios.post(`http://pvanam.retailtrac360.com:8080/MergedWebservicesFMCG/rest/EcomSales/ecommerceValidatePincode`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .catch('Failed to raise query')
        .then(response => {
            if (response.data) {
                salesCode = response.data['Sales_code'].split(';')[0]
            }
        })
    } catch (error) {
        return {...rsp, error: true}
    }
    
    console.log(salesCode)
    
    // let amount = response.data['Sales_code'].split(';')[1]
    // amount = Number(amount).toFixed(2)

    const amount = '1.00'
    const CRN = Math.floor(Math.random() * (999999))

    try {
        var paymentData = await getPaymentData()
    } catch (error) {
        return {...rsp, error: true}
    }

    try {
        var token = await getPaymentToken(salesCode, CRN)
    } catch (error) {
        return {...rsp, error: true}
    }

    const checkSumInput = `${paymentData.CID}${salesCode}${CRN}${amount}${paymentData.check_sum_value}`
    const checksum = await generateCheckSum(checkSumInput)
    
    const encryptionInput = querystring.stringify({
        VER: 1.0,
        CID: paymentData.CID,
        TYP: 'TEST',
        RID: salesCode,
        CRN: CRN,
        CNY: 'INR',
        AMT: amount,
        RTU: paymentData.return_url,
        PPI: '1.00|',
        RE1: 'MN',
        RE2: '',
        RE3: '',
        RE4: '',
        RE5: '',
        CKS: checksum
    })

    const i = encryptForPayment(encryptionInput, paymentData.encrypt_decrypt_pwd)

    const returnURL = `${paymentData.payment_url}?i=${i}&j=${token}`
    console.log(returnURL)
    console.log('Finished')
    return {...rsp, url: returnURL}
}

const getPaymentToken = async (so_code, crn) => {
    var token
    const url = `http://pvanam.retailtrac360.com:8080/generateTokendIDForAndroid?tokenID=&crn=${crn}&so_code=${so_code}`
    await axios.get(url)
    .then(response => {
        token = JSON.parse(response.data.getCallData).token
    })
    .catch('Failed to get token')

    return token
}
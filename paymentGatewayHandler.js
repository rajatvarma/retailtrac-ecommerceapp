import axios from 'axios'
import querystring from 'querystring'
import { ccavenue, encryptForPayment, generateCheckSum } from './algorithms'
import { createSalesOrderURL, getPaymentDataURL, getPaymentTokenURL, raiseSaleURL } from './apiCalls'

const getPaymentData = async () => {
    let values = {}
    await axios.get(getPaymentDataURL)
    .then(response => {
        if (typeof(response) === 'object') {
            for (let index = 0; index < response.data.data.length; index++) {
                const item = response.data.data[index]
                values[item['operation']] = item['url_values']
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

    cart.forEach(item => {
        itemCodes = itemCodes + `${item.item_code}:`
        itemQuantites = itemQuantites + `${item.cart_quantity}:`
        totalItemCount = totalItemCount + item.cart_quantity
        itemCost = itemCost + `${item.sell_price}:`
    });
    
    var data = {
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
    }

    try {
        await axios.post(raiseSaleURL, querystring.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .catch(() => {})
        .then(response => {
            if (response.data) {
                salesCode = response.data['Sales_code'].split(';')[0]
                amount = response.data['Sales_code'].split(';')[1]  
            }
        })
    } catch (error) {
        return {...rsp, error: true}
    }
    
    const redirect_url = generateCCAvenueRequest(user, amount, salesCode)
    return {...rsp, url: redirect_url, data: data, so_code: salesCode}
    
}

const getPaymentToken = async (so_code, crn) => {
    var token
    const url = getPaymentTokenURL+`?tokenID=&crn=${crn}&so_code=${so_code}`
    await axios.get(url)
    .then(response => {
        token = JSON.parse(response.data.getCallData).token
    })
    .catch('Failed to get token')

    return token
}

async function generateAxisBankRequest() {
    const amount = '1.00'
    const CRN = Math.floor(Math.random() * (999999))

    try {
        var paymentData = await getPaymentData()
        console.log(paymentData)
    } catch (error) {
        console.log('Payment Gateway Error')
        return {...rsp, error: true}
    }

    try {
        var token = await getPaymentToken(salesCode, CRN)
    } catch (error) {
        console.log('Token Error')
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
    return {...rsp, url: returnURL}
}

function generateCCAvenueRequest(user, total, order_id) {
    const url = 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction'
    const encryptionKey = 'C23410A32619F7738F408BC9D7062551'
    const access_code = 'AVUJ13IG97CN98JUNC'
    const data = {
        merchant_id: '433650',
        order_id: order_id,
        currency: 'INR',
        amount: total,
        redirect_url: '',
        cancel_url: '',
        language: 'EN',
        billing_name: user.customer_name,
        billing_email: user.email,
        billing_address: `${user.addressLine1}, ${user.addressLine2}`,
        billing_city: user.city,
        billing_state: 'Telangana',
        billing_country: 'India',
        billing_zip: user.pincode,
        billing_tel: user.telephone1,
    }

    const query = querystring.stringify(data)
    const enc_query = ccavenue(query, encryptionKey)
    const out = url+'&merchant_id=433650&encRequest='+enc_query+'&access_code='+access_code
    return out
}

export function logTransactionToServer(data, so_code) {
    axios.post(createSalesOrderURL, querystring.stringify({
        ...data,
        statusUpdate: 'open-PaymentSuccess',
        so_code: so_code
    }))
}
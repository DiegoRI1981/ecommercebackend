// 1. IMPORT
//IMPORT EXPRESS LIBRARY
//ROUTE MANAGEMENT
const express = require('express')


require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

const app = express()

const cors = require('cors')

// 2. MIDDLEWARES
//funcion que se ejecuta previo a las rutas (puede activar o ejecutar o configurar cosas dentro de una estancia)
app.use(express.json({ estended: true }))

//flexibilidad en el manejo de peticiones del cliente al servidor
app.use(cors())

// 3. ROUTES

app.get('/', async (request, response) => {

    // 3.1 IDs prices
    const productId = 'price_1NDo7CKVSDSv1BdWk7DBkt2k'
    // 3.2 Generate a session 

    const session = await stripe.checkout.sessions.create({
        //Products line
        line_items: [
            { // 3.3 product
                price: productId,
                quantity: 1
            }],
        payment_method_types: [
            'card'
        ],
        mode: 'payment', //pay type
        success_url: 'http://localhost:3005/success',
        cancel_url: 'http://localhost:3005?cancelled=true'
    })
    console.log(session)

    response.json({
        stripe_info: session
    })
})




// 4. SERVER

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})
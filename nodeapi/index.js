var API_KEY = 1234;

var express = require('express')
var router = express.Router()
var moment = require('moment')

router.get('/', function(res, req, next){
	res.send('Hello')
})

router.get('/user', function(res, req, next){
	if (req.query.key == API_KEY) {

		var fbid = req.query.fbid

		if (fbid != null) {
			req.getConnection(function(error,conn){
				conn.query('SELECT userPhone,name,address,fbid from User WHERE fbid=?',[fbid],function(err,rows,field){
					if (err) {
						res.status(500)
						res.send(JSON.stringify({ success: false, message: err.message }))
					} else{
						if (rows.length > 0) {
							res.send(JSON.stringify({ success: true, result: rows}))
						} else{
							res.send(JSON.stringify({ success: false, message: 'row'}))
						}
					}
				})
			})
		} else{
			res.send(JSON.stringify({ success: false, message: 'Missing fbid'}))
		}
	}
	else{
		res.send(JSON.stringify({ success:false, message: 'missing api key'}))
	}
})

router.post('/user', function(res, req, next){
	if (req.body.key == API_KEY) {

		var fbid = req.body.fbid
		var user_phone = req.body.userPhone
		var user_name = req.body.namePhone
		var user_address = req.body.userAddress

		if (fbid != null) {
			req.getConnection(function(error,conn){
				conn.query('INSERT INTO User (fbid,userPhone,userName,userAddress) VALUE(?,?,?,?) ON DUPLICATE UPDATE Name=?,Address=?'[fbid,user_phone,user_name,user_address], function(error, rows, field){
					if (error) {
						res.status(500)
						res.send(JSON.stringify(success:false, message:error.message))
					} else{
						if (rows.affectedRows) {
							res.send(JSON.stringify(success:true, result:rows))
						} else{
							res.send(JSON.stringify(success:false, message:'empty'))
						}
					}
				})
			})
		}
	}else{
		res.send(JSON.stringify(success:false, message:'wrong API Key'))
	}
})

//favourite
router.get('/favorite', function(res, req, next){
	if (req.query.key == API_KEY) {

		var fbid = req.body.fbid

		if (fbid != null) {

			req.getConnection(function(error,conn){
				conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM Favorite WHERE fbid?',[fbid], function(err, rows, field){
					if (err) {
						res.status(500)
						res.send(JSON.stringify(success:false, message:err.message))
					}else{
						if (rows.length > 0) {
							res.send(JSON.stringify(success:true, result:rows))
						}else{
							res.send(JSON.stringify(success:false, message:'empty'))
						}
					}
				})
			})
		}else{
			res.send(JSON.stringify(success:false, message:'wrong id'))
		}

	}else{
		res.send(JSON.stringify(success:false, message:'wrong API Key'))
	}
})


router.get('/favoriteByRestaurant', function(res, req, next){
	if (req.query.key == API_KEY) {

		var fbid = req.body.fbid
		var restaurant_id = req.body.restaurant_id

		if (fbid != null) {

			req.getConnection(function(error,conn){
				conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM Favorite WHERE fbid? AND restaurantId=?',[fbid,restaurant_id], function(err, rows, field){
					if (err) {
						res.status(500)
						res.send(JSON.stringify(success:false, message:err.message))
					}else{
						if (rows.length > 0) {
							res.send(JSON.stringify(success:true, result:rows))
						}else{
							res.send(JSON.stringify(success:false, message:'empty'))
						}
					}
				})
			})
		}else{
			res.send(JSON.stringify(success:false, message:'wrong id'))
		}

	}else{
		res.send(JSON.stringify(success:false, message:'wrong API Key'))
	}
})

router.post('/favorite', function(res, req, next){
	if (req.query.key == API_KEY) {

		var fbid = req.body.fbid;
		var food_id = req.body.food_id;
		var restaurant_id = req.body.restaurant_id;
		var restaurant_name = req.body.restaurant_name;
		var food_name = req.body.food_name;
		var food_image = req.body.food_image;
		var food_price = req.body.food_price;
		if (fbid != null) {
			req.getConnection(function(error,conn){
				conn.query('INSERT INTO favorite (FBID,FoodId,RestaurantId,RestaurantName,FoodName,FoodImage,Price) VALUE(?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE Name=?,Address=?',[fbid,food_id,restaurant_id,restaurant_name,food_name,food_image,food_price],function(err,rows,field){
					if (err) {
						res.status(500)
						res.send(JSON.stringify(success:false, message:err.message))
					}else{
						if (rows.affectedRows > 0) {
							res.send(JSON.stringify(success:true, message:'success'))
						} else{
							res.send(JSON.stringify(success:false, message:'empty'))
						}
					}
				})
			})
		}
	}else{
		res.send(JSON.stringify(success:false, message:'no api key'))
	}
})

router.delete('/favorite', function(res, req, next){
	if (req.query.key == API_KEY) {
		var fbid = req.body.fbid
		var food_id = req.body.food_id
		var restaurant_id = req.body.restaurant_id


		req.getConnection(function(error,conn){
			conn.query('DELETE FROM Favorite WHERE FBID=? AND FoodId=? AND RestaurantId=?',[fbid,food_id,restaurant_id], function(err,rows,field){
				if (err) {
					res.send(JSON.stringify(success:false, message:err.message))
				}else{
					if (rows.affectedRows > 0) {
						res.send(JSON.stringify(success:true, message:'success'))
					}else{
						res.send(JSON.stringify(success:false, message:'err'))
					}
				}
			})
		})

	} else{
		res.send(JSON.stringify(success:false, message:'no api key'))
	}
})

//restaurant
router.get('/restaurant',function(res, req, next){
	if (req.query.key == API_KEY) {
		getConnection(function(error,conn){
		conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM Restaurant',function(err,rows,fields){
			if (err) {
				res.send(success:false, message:err.message)				
			}else{
				if (rows.length > 0) {

					res.send(success:false, message:rows)

				}else{

					res.send(success:false,message:'empty')

				}
			}
		})
		})
	}else{
		res.send(success:false, message:'wrong api key')
	}	
})

router.get('/restaurantById',function(res, req, next){
	if (req.query.key == API_KEY) {
		var id = req.body.restaurant_id
		req.getConnection(function(error,conn){
			if (id != null) {
					conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM Restaurant WHERE restaurant_id?',[id],function(err,rows,field){
					if (err) {
						res.status(500)
						res.send(success:false, message:err.message)				
					}else{
						if (rows.length > 0) {
							res.send(success:false, message:rows)
						}else{
							res.send(success:false,message:'empty')
						}
					}
				})
				}else{
					res.send(success:false,message:'empty id')
				}
			
		})
	}else{
		res.send(success:false,message:'empty')
	}
})

router.get('/restaurantById',function(res, req, next){
	if (req.query.key == API_KEY) {
		req.getConnection(function(error,conn){
			var user_lng = parseFloat(req.body.lat)
			var user_lat = parseFloat(req.body.lng)
			var distance = parseFloat(req.body.distance)
			if (user_lat != NaN && user_lng != NaN) {
					conn.query('SELECT * FROM (SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl,'
						+ 'ROUND(111.045 * DEGREES(ACOS(COS(RADIANS(?) * COS(RADIANS(lat))'
						+ '* COS(RADIANS(lng) - RADIANS(?)) + SIN(RADIANS(?))'
						+ '* SIN(RADIANS(lat)))),2) AS distance_in_km FROM Restaurant)tempTable WHERE distance_in_km < ?',[user_lat,user_lng,distance_in_km]' FROM Restaurant WHERE restaurant_id?',[id],function(err,rows,field){
					if (err) {
						res.status(500)
						res.send(JSON.stringify({success:false,message:'wrong api key'}))				
					}else{
						if (rows.length > 0) {
							res.send(JSON.stringify({success:true, result:rows}))
						}else{
							res.send(JSON.stringify({success:false, message:'empty'}))
						}
					}
				})
				}else{
					res.send(JSON.stringify({success:false, message:'wrong id'}))
				}
			
		})
	}else{
		res.send(JSON.stringify({success:false,message:'wrong api key'}))
	}
})

//menu
router.get('/menu',function(res, req, next){
	if (req.query.key == API_KEY) {
		req.getConnection(function(error,conn){
			var restaurant_id = req.body.restaurantId
			conn.query('SELECT id,name,description,image FROM Menu WHERE id in (SELECT menuId FROM Restaurant_Menu WHERE restaurantId)',[restaurant_id],function(err,rows,field){
				if (err) {
					res.status(500)
					res.send(JSON.stringify({success:true, message:'error'}))
				}else{
					if (rows.length > 0) {
						res.send(JSON.stringify({ success:true, result:rows}))
					}else{
						res.send(JSON.stringify({ success:true, message:'empty'}))
					}
				}
			})
		})
	}else{
		res.send(JSON.stringify({success:false,message:'wrong api key'}))
	}
})

//food
router.get('/food',function(res, req, next){
	if (req.query.key == API_KEY) {
		req.getConnection(function(conn,error){
			var menuId = req.query.menuId
			if (menuId != null) {
				conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
					+ 'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as isAddon,'
					+ 'discount FROM Food WHERE id in (SELECT foodId FROM Menu_Food WHERE menuId=?)', [menu_id], function(err, rows, field){
						if (err) {
							res.status(500)
							res.send(JSON.stringify({success:false,message:'error'}))
						}else{
							if (rows.length > 0) {
								res.send(JSON.stringify({success:false,result:rows}))
							}else{
								res.send(JSON.stringify({success:false,message:'empty'}))
							}
						}
					})
			}else{
				res.send(JSON.stringify({success:false,message:'invalid id'}))

			}
		})
	}
})

router.get('foodById', function(res, req, next){
	if (req.query.key == API_KEY) {
		req.getConnection(function(err, conn){
			var food_id = req.body.menu_id;
			if (food_id != null) {
				conn.query('SELECT id,name,description,image,price,CASE WHEN isSize = 1 THEN \'TRUE\' ELSE \'FALSE\' END AS isSize'
					'CASE WHEN isAddon = 1 THEN \'TRUE\' ELSE \'FALSE\' END AS isAddon'
					'discount FROM FOOD WHERE id?',[food_id],function(err, rows, field){
						if (err) {
							res.status(500)
							res.send(JSON.stringify({ success:false, message:err.message}))
						} else{
							if (rows.length > 0) {
								res.send(JSON.stringify({ success:true, result:rows}))
							} else{
								res.send(JSON.stringify({ success:false, message:'empty'}))
							}
						}
					})
			}else{
				res.send(JSON.stringify({ success:false,message:'invalid id' }))

			}
		})
	} else{
		res.send(JSON.stringify({ success:false, message:'wrong api key'}))
	}
})

router.get('foodById', function(res, req, next){
	if (req.query.key == API_KEY) {
		req.getConnection(function(err, conn){
			var search_query = '%' req.query.foodname+'%';
			if (search_query != null) {
				conn.query('SELECT id,name,description,image,price,CASE WHEN isSize = 1 THEN \'TRUE\' ELSE \'FALSE\' END AS isSize'
					'CASE WHEN isAddon = 1 THEN \'TRUE\' ELSE \'FALSE\' END AS isAddon'
					'discount FROM FOOD WHERE name LIKE?',[search_query],function(err, rows, field){
						if (err) {
							res.status(500)
							res.send(JSON.stringify({ success:false, message:err.message}))
						} else{
							if (rows.length > 0) {
								res.send(JSON.stringify({ success:true, result:rows}))
							} else{
								res.send(JSON.stringify({ success:false, message:'empty'}))
							}
						}
					})
			}else{
				res.send(JSON.stringify({ success:false,message:'invalid id' }))

			}
		})
	} else{
		res.send(JSON.stringify({ success:false, message:'wrong api key'}))
	}
})

//size
router.get('/size',function(res, req, next){
	if (req.query.key == API_KEY) {
		req.getConnection(function(conn,error){
			var menuId = req.query.menuId
			if (menuId != null) {
				conn.query('SELECT id,description,extraPrice FROM Addon WHERE id in (SELECT addonId FROM Food_Addon WHERE foodId=?)', [food_id], function(err, rows, field){
						if (err) {
							res.status(500)
							res.send(JSON.stringify({success:false,message:'error'}))
						}else{
							if (rows.length > 0) {
								res.send(JSON.stringify({success:false,result:rows}))
							}else{
								res.send(JSON.stringify({success:false,message:'empty'}))
							}
						}
					})
			}else{
				res.send(JSON.stringify({success:false,message:'invalid id'}))

			}
		})
	}
})
//Addon 

router.get('/addon',function(res, req, next){
	if (req.query.key == API_KEY) {
		req.getConnection(function(conn,error){
			var menuId = req.query.menuId
			if (menuId != null) {
				conn.query('SELECT id,name,description,extraPrice FROM Food WHERE id in (SELECT foodId FROM Menu_Food WHERE menuId=?)', [menu_id], function(err, rows, field){
						if (err) {
							res.status(500)
							res.send(JSON.stringify({success:false,message:'error'}))
						}else{
							if (rows.length > 0) {
								res.send(JSON.stringify({success:false,result:rows}))
							}else{
								res.send(JSON.stringify({success:false,message:'empty'}))
							}
						}
					})
			}else{
				res.send(JSON.stringify({success:false,message:'invalid id'}))

			}
		})
	}
})

//Order

router.get('/order',function(res, req, next){
	if (req.query.key == API_KEY) {
		req.getConnection(function(conn,error){
			var order_fbid = req.query.orderFBID
			if (order_fbid != null) {
				conn.query('SELECT orderId,orderFBID,orderPhone,orderName,orderAddress,orderStatus,orderDate,'
					+ 'restaurantId,transactionId,'
					+ 'CASE WHEN cod=1 THEN \'TRUE\' ELSE \'FALSE\' END as cod,'
					+ 'totalPrice, numOfItem FROM `Order` WHERE orderFBID =? AND numOfItem > 0'
					+ 'ORDER BY orderId DESC', [order_fbid], function(err, rows, field){
						if (err) {
							res.status(500)
							res.send(JSON.stringify({success:false,message:'error'}))
						}else{
							if (rows.length > 0) {
								res.send(JSON.stringify({success:false,result:rows}))
							}else{
								res.send(JSON.stringify({success:false,message:'empty'}))
							}
						}
					})
			}else{
				res.send(JSON.stringify({success:false,message:'invalid id'}))

			}
		})
	}
})

router.post('/createOrder', function(res, req, next){
	if (req.query.key == API_KEY) {

		var order_phone = req.body.orderPhone;
		var order_name = req.body.orderName;
		var order_address = req.body.orderAddress;
		var order_date = moment(req.body.orderDate, "MM/DD/YYYY").format("YYYY-MM-DD");
		var restaurant_id = req.body.restaurantId;
		var transaction_id = req.body.transactionId;
		var cod = req.body.cod;
		var total_price = req.body.totalPrice;
		var num_of_item = req.body.numOfItem;
		var order_fbid = req.body.orderFBID;
		if (fbid != null) {
			req.getConnection(function(error,conn){
				conn.query('INSERT INTO Order(OrderFBID,OrderPhone,OrderName,OrderAddress,OrderStatus,RestaurantId,TransactionId,COD,TotalPrice,NumOfItem) VALUE(?,?,?,?,?,?,?,?,?,?,?)',[order_fbid,order_phone,order_name,order_address,order_date,restaurant_id,transaction_id,cod,total_price,num_of_item],function(err,rows,field){
					if (err) {
						res.status(500)
						res.send(JSON.stringify(success:false, message:err.message))
					}else{
						conn.query('SELECT OrderId as orderNumber FROM `Order` WHERE OrderFBID=? AND NumOfItem > 0 ORDER BY orderNumber DESC LIMIT 1',[order_fbid],function(err,rows,field){
							if (err) {

								res.status(500)
								res.send(JSON.stringify({ success: false, message: err.message }))

							}else{

								res.send(JSON.stringify({ success: false, result: rows }))

							}
						}
					}
				})
			})
		}
	}else{
		res.send(JSON.stringify(success:false, message:'no api key'))
	}
})

//OrderDetail
router.get('/orderDetail',function(res, req, next){
	if (req.query.key == API_KEY) {
		req.getConnection(function(conn,error){
			var order_id = req.query.orderID
			if (order_id != null) {
				conn.query('SELECT orderId,itemId,quantity,discount,extraPrice,size,addon FROM OrderDetail WHERE orderId=?', [order_id], function(err, rows, field){
						if (err) {
							res.status(500)
							res.send(JSON.stringify({success:false,message:'error'}))
						}else{
							if (rows.length > 0) {
								res.send(JSON.stringify({success:false,result:rows}))
							}else{
								res.send(JSON.stringify({success:false,message:'empty'}))
							}
						}
					})
			}else{
				res.send(JSON.stringify({success:false,message:'Missing orderId in query'}))

			}
		})
	}
})

router.post('/updateOrder', function(res, req, next){
	if (req.query.key == API_KEY) {

		var order_id = req.query.orderId
		var order_detail

		try {
			order_detail = JSON.parse(req.body.orderDetail)
		}
		catch(err){
			res.status(500)
			res.send(JSON.stringify(success:false, message:err.message))
		}

		if (order_detail != null && order_id != null) {

			var data_insert = []
			for (var i = 0; i < order_detail.length; i++) {
				data_insert[i] = [
					parseInt(order_id),
					order_detail[i]['foodId'],
					order_detail[i]['foodQuantity'],
					order_detail[i]['foodPrice'],
					0,//discount
					order_detail[i]['foodSize'],
					order_detail[i]['foodAddon'],
					parseFloat(order_detail[i]['foodExtraPrice'])
				]
			}
			req.getConnection(function(error,conn){
				res.send(JSON.stringify({ success:true, message: 'updated successfully'}))
			})
		}
	}else{
		res.send(JSON.stringify(success:false, message:'Missing orderId and orderDetail in body'))
	}
})

module.exports = router;

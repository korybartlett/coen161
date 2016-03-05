var cart = {
	shoesQuantity: 0,
	hatQuantity: 0,
	combQuantity: 0,
	penCupQuantity: 0,
	penCaseQuantity: 0,
	cupsQuantity: 0,
	subTotal: 0,
	shipping: 0,
	tax: 0,
	total: 0
};

var shopper = {
	memCode: '',
	address: '',
	email: '',
	phone: ''
};

var products;

/*
var stock = {
	shoes: 0,
	hat: 0,
	comb: 0,
	penCup: 0,
	penCase: 0,
	cups: 0
};
*/

$(document).ready(function() {

	products = $.getJSON("php/get_catalog.php");

	products.done(function(data) {
		products = data;
		for (var i = 0; i < products.length; i++) {
			products[i].quantity = Number(products[i].quantity);
		}
		init(products);
	});
});

function init(data) {
	//successfully gets products now
	for (var i = 0; i < 6; i++) {
		$('#p'+(i+1)).css('background', 'url(' + data[i].image + ')');
	}
	$('#answerA').html(data[0].name + ' $' + data[0].price + '<br />' + data[0].quantity + ' in stock');
	$('#answerB').html(data[1].name + ' $' + data[1].price + '<br />' + data[1].quantity + ' in stock');
	$('#answerC').html(data[2].name + ' $' + data[2].price + '<br />' + data[2].quantity + ' in stock');
	$('#answerD').html(data[3].name + ' $' + data[3].price + '<br />' + data[3].quantity + ' in stock');
	$('#answerE').html(data[4].name + ' $' + data[4].price + '<br />' + data[4].quantity + ' in stock');
	$('#answerF').html(data[5].name + ' $' + data[5].price + '<br />' + data[5].quantity + ' in stock');


	$('#btn1').click(addToCart(data[0], 'A'));
	$('#btn2').click(addToCart(data[1], 'B'));
	$('#btn3').click(addToCart(data[2], 'C'));
	$('#btn4').click(addToCart(data[3], 'D'));
	$('#btn5').click(addToCart(data[4], 'E'));
	$('#btn6').click(addToCart(data[5], 'F'));

	$('#removeA').click(removeFromCart(data[0], 'A'));
	$('#removeB').click(removeFromCart(data[1], 'B'));
	$('#removeC').click(removeFromCart(data[2], 'C'));
	$('#removeD').click(removeFromCart(data[3], 'D'));
	$('#removeE').click(removeFromCart(data[4], 'E'));
	$('#removeF').click(removeFromCart(data[5], 'F'));

	$('#submitInfo').click(updateShopper);
	$('#checkout').click(checkout);
	$('#description').click(function() {
		alert('shoes: Recycled soles for the shoe’s sole allow for a green footprint\
			\nhat: Support the green cause by wearing a green hat to promote recycling and helping mother earth\
			\ncomb: Made of recycled plastics, but not for recycled looks\
			\npen cups: recycled papers were reformed into sturdy yet stylish holders for pencils and pens\
			\npen case: made of various recycled materials the pen case shows you care about the environment\
			\ncups: Made of recycled paper and various materials. The paper cups allow for a nice beverage at no cost to the earth');
	});
}

function addToCart(data, chId) {
	return function() {
		if (data.quantity > 0) {
			data.quantity--;
			$('#answer' + chId).html(data.name + ' $' + data.price + '<br />' + (data.quantity) + ' in stock');
			$('.cartEntry > #remove' + chId).css('display', 'inline-block');
			if (data.name == 'shoes') {
				cart.shoesQuantity++;
				$('#shoes').css('display', 'inline-block');
				$('#shoes').html(data.name+': '+cart.shoesQuantity);
			}
			else if (data.name == 'comb') {
				cart.combQuantity++;
				$('#comb').css('display', 'inline-block');
				$('#comb').html(data.name+': '+cart.combQuantity);
			}
			else if (data.name == 'hat') {
				cart.hatQuantity++;
				$('#hat').css('display', 'inline-block');
				$('#hat').html(data.name+': '+cart.hatQuantity);
			}
			else if (data.name == 'pen cups') {
				cart.penCupQuantity++;
				$('#penCups').css('display', 'inline-block');
				$('#penCups').html(data.name+': '+cart.penCupQuantity);
			}
			else if (data.name == 'pen case') {
				cart.penCaseQuantity++;
				$('#penCase').css('display', 'inline-block');
				$('#penCase').html(data.name+': '+cart.penCaseQuantity);
			}
			else {
				cart.cupsQuantity++;
				$('#cups').css('display', 'inline-block');
				$('#cups').html(data.name+': '+cart.cupsQuantity);
			}
			cart.subTotal += Number(data.price);
			cart.shipping = 7;
			cart.tax = cart.subTotal * 0.0875;
			cart.tax = cart.tax.toFixed(2);
			if (shopper.memCode != '') {
				cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
			}
			else {
				cart.total = Number(cart.tax) + cart.subTotal;
			}
			cart.total = cart.total.toFixed(2);
			$('#productName').html("Product Name: " + cart.productName);
			$('#productQuantity').html("Quantity: " + cart.quantity);
			$('#cartSub').html("Subtotal: " + cart.subTotal);
			$('#cartShipping').html("Shipping: " + cart.shipping);
			$('#cartTax').html("Tax: " + cart.tax);
			$('#cartTotal').html("Total: " + cart.total);
		}
		else {
			alert('You will be notified when product comes in stock again');
		}

	}
}

function removeFromCart(data, chId) {
	return function() {
		data.quantity++;
		$('#answer' + chId).html(data.name + ' $' + data.price + '<br />' + (data.quantity) + ' in stock');
		if (chId == 'A') {
			console.log('remove shoes');
			cart.shoesQuantity--;
			$('#shoes').html(data.name+': '+cart.shoesQuantity);
			if (cart.shoesQuantity == 0) {
				$('#shoes, #removeA').css('display', 'none');
			}
		}
		else if (chId == 'B') {
			console.log('remove hat');
			cart.hatQuantity--;
			$('#hat').html(data.name+': '+cart.hatQuantity);
			if (cart.hatQuantity == 0) {
				$('#hat, #removeB').css('display', 'none');
			}
		}
		else if (chId == 'C') {
			console.log('remove comb');
			cart.combQuantity--;
			$('#comb').html(data.name+': '+cart.combQuantity);
			if (cart.combQuantity == 0) {
				$('#comb, #removeC').css('display', 'none');
			}
		}
		else if (chId == 'D') {
			console.log('remove pen cups');
			cart.penCupQuantity--;
			$('#penCups').html(data.name+': '+cart.penCupQuantity);
			if (cart.penCupQuantity == 0) {
				$('#penCups, #removeD').css('display', 'none');
			}
		}
		else if (chId == 'E') {
			console.log('remove pen case');
			cart.penCaseQuantity--;
			$('#penCase').html(data.name+': '+cart.penCaseQuantity);
			if (cart.penCaseQuantity == 0) {
				$('#penCase, #removeE').css('display', 'none');
			}
		}
		else {
			console.log('remove cups');
			cart.cupsQuantity--;
			$('#cups').html(data.name+': '+cart.cupsQuantity);
			if (cart.cupsQuantity == 0) {
				$('#cups, #removeF').css('display', 'none');
			}
		}
		cart.subTotal -= Number(data.price);
		cart.shipping = 7;
		cart.tax = cart.subTotal * 0.0875;
		cart.tax = cart.tax.toFixed(2);
		if (shopper.memCode != '') {
			cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
		}
		else {
			cart.total = Number(cart.tax) + cart.subTotal;
		}
		cart.total = cart.total.toFixed(2);
		$('#productName').html("Product Name: " + cart.productName);
		$('#productQuantity').html("Quantity: " + cart.quantity);
		$('#cartSub').html("Subtotal: " + cart.subTotal);
		$('#cartShipping').html("Shipping: " + cart.shipping);
		$('#cartTax').html("Tax: " + cart.tax);
		$('#cartTotal').html("Total: " + cart.total);
	}
}

/*
function addToCart(data, chId) {
	return function() {
		if (data.quantity > 0) {
			data.quantity--;
			console.log(products[0]);
			if (data.name == 'shoes') {
				cart.shoesQuantity++;
				$('#answer' + chId).html(data.name + ' $' + data.price + '<br />' + (products[0].quantity) + ' in stock');
				$('#shoes').html(data.name+': '+cart.shoesQuantity+'<img id="removeShoes" src="icons/minus.svg"/>');
				$('#removeShoes').click(function() {
					cart.shoesQuantity--;
					data.quantity++;
					$('#answer' + chId).html(data.name + ' $' + data.price + '<br />' + (products[0].quantity) + ' in stock');
					cart.subTotal -= Number(data.price);
					cart.shipping = 7;
					cart.tax = cart.subTotal * 0.0875;
					cart.tax = cart.tax.toFixed(2);
					if (shopper.memCode != '') {
						cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
					}
					else {
						cart.total = Number(cart.tax) + cart.subTotal;
					}
					cart.total = cart.total.toFixed(2);
					$('#shoes').html(data.name+': '+cart.shoesQuantity+'<img id="removeShoes" src="icons/minus.svg"/>');
					$('#cartSub').html("Subtotal: " + cart.subTotal);
					$('#cartShipping').html("Shipping: " + cart.shipping);
					$('#cartTax').html("Tax: " + cart.tax);
					$('#cartTotal').html("Total: " + cart.total);
					console.log(cart);
				});
			}
			else if (data.name == 'comb') {
				cart.combQuantity++;
				$('#answerC').html('comb $10<br />' + (products[2].quantity - cart.combQuantity)+' in stock');
				$('#comb').html(data.name+': '+cart.combQuantity+'<img id="removeComb" src="icons/minus.svg"/>');
				$('#removeComb').click(function() {
					cart.combQuantity--;
					$('#answerC').html('comb $10<br />' + (products[2].quantity - cart.combQuantity)+' in stock');
					cart.subTotal -= Number(data.price);
					cart.shipping = 7;
					cart.tax = cart.subTotal * 0.0875;
					cart.tax = cart.tax.toFixed(2);
					if (shopper.memCode != '') {
						cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
					}
					else {
						cart.total = Number(cart.tax) + cart.subTotal;
					}
					cart.total = cart.total.toFixed(2);
					$('#comb').html(data.name+': '+cart.combQuantity+'<img id="removeComb" src="icons/minus.svg"/>');
					$('#cartSub').html("Subtotal: " + cart.subTotal);
					$('#cartShipping').html("Shipping: " + cart.shipping);
					$('#cartTax').html("Tax: " + cart.tax);
					$('#cartTotal').html("Total: " + cart.total);
					console.log(cart);
				});
			}
			else if (data.name == 'hat') {
				cart.hatQuantity++;
				$('#answerB').html('hat $10<br />' + (products[1].quantity - cart.hatQuantity)+' in stock');
				$('#hat').html(data.name+': '+cart.hatQuantity+'<img id="removeHat" src="icons/minus.svg"/>');
				$('#removeHat').click(function() {
					cart.hatQuantity--;
					$('#answerB').html('hat $10<br />' + (products[1].quantity - cart.hatQuantity)+' in stock');
					cart.subTotal -= Number(data.price);
					cart.shipping = 7;
					cart.tax = cart.subTotal * 0.0875;
					cart.tax = cart.tax.toFixed(2);
					if (shopper.memCode != '') {
						cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
					}
					else {
						cart.total = Number(cart.tax) + cart.subTotal;
					}
					cart.total = cart.total.toFixed(2);
					$('#hat').html(data.name+': '+cart.hatQuantity+'<img id="removeHat" src="icons/minus.svg"/>');
					$('#cartSub').html("Subtotal: " + cart.subTotal);
					$('#cartShipping').html("Shipping: " + cart.shipping);
					$('#cartTax').html("Tax: " + cart.tax);
					$('#cartTotal').html("Total: " + cart.total);
					console.log(cart);
				});
			}
			else if (data.name == 'pen cups') {
				cart.penCupQuantity++;
				$('#answerD').html('pen cup $10<br />' + (products[3].quantity - cart.penCupQuantity)+' in stock');
				$('#penCups').html(data.name+': '+cart.penCupQuantity+'<img id="removePenCups" src="icons/minus.svg"/>');
				$('#removePenCups').click(function() {
					cart.penCupQuantity--;
					$('#answerD').html('pen cup $10<br />' + (products[3].quantity - cart.penCupQuantity)+' in stock');
					cart.subTotal -= Number(data.price);
					cart.shipping = 7;
					cart.tax = cart.subTotal * 0.0875;
					cart.tax = cart.tax.toFixed(2);
					if (shopper.memCode != '') {
						cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
					}
					else {
						cart.total = Number(cart.tax) + cart.subTotal;
					}
					cart.total = cart.total.toFixed(2);
					$('#penCups').html(data.name+': '+cart.penCupQuantity+'<img id="removePenCups" src="icons/minus.svg"/>');
					$('#cartSub').html("Subtotal: " + cart.subTotal);
					$('#cartShipping').html("Shipping: " + cart.shipping);
					$('#cartTax').html("Tax: " + cart.tax);
					$('#cartTotal').html("Total: " + cart.total);
					console.log(cart);
				});
			}
			else if (data.name == 'pen case') {
				cart.penCaseQuantity++;
				$('#answerE').html('pen case $10<br />' + (products[4].quantity - cart.penCaseQuantity)+' in stock');
				$('#penCase').html(data.name+': '+cart.penCaseQuantity+'<img id="removePenCase" src="icons/minus.svg"/>');
				$('#removePenCase').click(function() {
					cart.shoesQuantity--;
					$('#answerE').html('pen case $10<br />' + (products[4].quantity - cart.penCaseQuantity)+' in stock');
					cart.subTotal -= Number(data.price);
					cart.shipping = 7;
					cart.tax = cart.subTotal * 0.0875;
					cart.tax = cart.tax.toFixed(2);
					if (shopper.memCode != '') {
						cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
					}
					else {
						cart.total = Number(cart.tax) + cart.subTotal;
					}
					cart.total = cart.total.toFixed(2);
					$('#penCase').html(data.name+': '+cart.penCaseQuantity+'<img id="removePenCase" src="icons/minus.svg"/>');
					$('#cartSub').html("Subtotal: " + cart.subTotal);
					$('#cartShipping').html("Shipping: " + cart.shipping);
					$('#cartTax').html("Tax: " + cart.tax);
					$('#cartTotal').html("Total: " + cart.total);
					console.log(cart);
				});
			}
			else {
				cart.cupsQuantity++;
				$('#answerF').html('cups $10<br />' + (products[5].quantity - cart.cupsQuantity)+' in stock');
				$('#cups').html(data.name+': '+cart.cupsQuantity+'<img id="removeCups" src="icons/minus.svg"/>');
				$('#removeCups').click(function() {
					cart.cupsQuantity--;
					$('#answerF').html('cups $10<br />' + (products[5].quantity - cart.cupsQuantity)+' in stock');
					cart.subTotal -= Number(data.price);
					cart.shipping = 7;
					cart.tax = cart.subTotal * 0.0875;
					cart.tax = cart.tax.toFixed(2);
					if (shopper.memCode != '') {
						cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
					}
					else {
						cart.total = Number(cart.tax) + cart.subTotal;
					}
					cart.total = cart.total.toFixed(2);
					$('#cups').html(data.name+': '+cart.cupsQuantity+'<img id="removeCups" src="icons/minus.svg"/>');
					$('#cartSub').html("Subtotal: " + cart.subTotal);
					$('#cartShipping').html("Shipping: " + cart.shipping);
					$('#cartTax').html("Tax: " + cart.tax);
					$('#cartTotal').html("Total: " + cart.total);
					console.log(cart);
				});
			}
			cart.subTotal += Number(data.price);
			cart.shipping = 7;
			cart.tax = cart.subTotal * 0.0875;
			cart.tax = cart.tax.toFixed(2);
			if (shopper.memCode != '') {
				cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
			}
			else {
				cart.total = Number(cart.tax) + cart.subTotal;
			}
			cart.total = cart.total.toFixed(2);
			$('#productName').html("Product Name: " + cart.productName);
			$('#productQuantity').html("Quantity: " + cart.quantity);
			$('#cartSub').html("Subtotal: " + cart.subTotal);
			$('#cartShipping').html("Shipping: " + cart.shipping);
			$('#cartTax').html("Tax: " + cart.tax);
			$('#cartTotal').html("Total: " + cart.total);
			console.log(cart);
		}
		else {
			alert('You will be notified when product comes in stock again');
		}

	}
}
*/

function checkout() {
	if (shopper.address == '' || shopper.email == '') {
		alert("please fill out all fields or enter a valid member code");
		return;
	}
	//shopper info is filled
	alert('Thank you for your purchase');
	$.ajax({
		url: 'php/update_catalog.php',
		type: 'POST',
		data: cart,
		success: function(data) {
			location.reload();
		},
		error: function() {
			console.log('error');
			alert('An error occured processing your purchase');
		}
	});
}

function updateShopper() {
	if ($('#textarea1').val() == '') {
		//no member code
		shopper.address = $('#address').val();
		shopper.email = $('#email').val();
		shopper.phone = $('#phone').val();
	}
	else {
		shopper.memCode = $('#textarea1').val();
		$.ajax({
			url: 'php/update_shopper.php',
			type: 'POST',
			data: shopper,
			success: function(data) {
				data = JSON.parse(data);
				console.log(data);
				if (data.signature == 'success') {
					shopper.address = data.address;
					shopper.email = data.email;
					cart.total = Number(cart.tax) + (cart.subTotal - (cart.subTotal / 10));
					cart.total = cart.total.toFixed(2);
					if (cart.total != 0) {
						$('#cartTotal').html("Total: " + cart.total);
					}
				}
				else {
					alert('invalid member code');
				}
			},
			error: function() {
				console.log('error');
				alert('An error occured processing your info');
			},
			async: false
		});
	}
}


$(function(){
	
	$(".numbers-only").keyup(function(){
		var fixed=$(this).val().replace(/[^0-9.]/g,"");
		$(this).val( fixed );
	});

	$(".calculate").click(function(){
		$(".tool").slideUp( 'slow' );
		$(".results").slideDown( 'slow' );
		$('html,body').animate({
			scrollTop: $( "header img" ).height()
        }, 800);

		var loan_info = $.loanInfo({
			amount: $(".calculator .amount").val(),
			rate: $(".calculator .rate").val(),
			term: $(".calculator .term").val()
		});

		var loan_info_compare = $.loanInfo({
			amount: $(".calculator .amount").val(),
			rate: $(".calculator .rate_compare").val(),
			term: $(".calculator .term").val()
		});

		var interest_savings = loan_info.total_interest - loan_info_compare.total_interest;
		interest_savings = ( Math.ceil( interest_savings * 100 ) / 100 );

		var one_percent = loan_info_compare.original_amount * .01;

		var three_months = Math.ceil( ( loan_info_compare.payment_amount * 300 ) ) / 100;

		var total_savings = interest_savings + one_percent + three_months;

		// log the calculation data for test purposes
		console.log( loan_info );
		console.log( loan_info_compare );
		console.log( interest_savings );
		console.log( one_percent );
		console.log( three_months );
		console.log( total_savings );

		$(".results .interest-savings").html( interest_savings );
		$(".results .cash-back").html( one_percent );
		$(".results .no-payments").html( three_months );
		$(".results .total-savings").html( total_savings );
	});

	$(".go-back").click(function(){
		$(".tool").slideDown( 'slow' );
		$(".results").slideUp( 'slow' );
	});

});


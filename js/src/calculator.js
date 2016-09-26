

$(function(){
	
	$(".numbers-only").keyup(function(){
		var fixed=$(this).val().replace(/[^0-9.]/g,"");
		$(this).val( fixed );
	});

	$("input.type").change(function(){
		if ( $(this).val() == "purchase" ) {
			$(".rate-field").slideUp();
			$(".calculator .rate").val( "" );
		} else {
			$(".rate-field").slideDown();
		}
	});

	$(".calculate").click(function(){
		if ( $(".calculator .amount").val() > 0 ) {

			// hide the error div in case it's visible
			$(".error").hide();

			// slide closed the tool, and open the results
			$(".tool").slideUp( 'slow' );
			$(".results").slideDown( 'slow' );
			$('html,body').animate({
				scrollTop: $( "header img" ).height()
	        }, 800);

			// calculate the loan with the CU rate
			var loan_info_compare = $.loanInfo({
				amount: $(".calculator .amount").val(),
				rate: $(".calculator .rate_compare").val(),
				term: $(".calculator .term").val()
			});

			// initially set the interest savings to 0 by default
			var interest_savings = 0;

			// if the rate is set (it's a refinance) calculate a comparison loan
			if ( $(".calculator .rate").val() > 0 ) {

				var loan_info = $.loanInfo({
					amount: $(".calculator .amount").val(),
					rate: $(".calculator .rate").val(),
					term: $(".calculator .term").val()
				});
				interest_savings = loan_info.total_interest - loan_info_compare.total_interest;
				interest_savings = ( Math.ceil( interest_savings * 100 ) / 100 );

				$(".interest-savings-text").show();

			} else {

				$(".interest-savings-text").hide();

			}

			// calculate one percent cash back
			var one_percent = loan_info_compare.original_amount * .01;

			// calculate three months of no payments
			var three_months = Math.ceil( ( loan_info_compare.payment_amount * 300 ) ) / 100;

			// calculate total savings
			var total_savings = interest_savings + one_percent + three_months;

			// set values in results spans.
			$(".results .interest-savings").html( interest_savings );
			$(".results .cash-back").html( one_percent );
			$(".results .no-payments").html( three_months );
			$(".results .total-savings").html( total_savings );
		} else {
			$(".error").slideDown();
		}
	});

	$(".go-back").click(function(){
		$(".tool").slideDown( 'slow' );
		$(".results").slideUp( 'slow' );
	});

});


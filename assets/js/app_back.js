$(document).ready(function () {
	console.info('age-calculator-app-main');

	main();
});

let day, month, year;
const currentYear = new Date().getFullYear();

let validate = {
	day: false,
	month: false,
	year: false,
	ok: false
}

let daysMonths = {
	1: 31, //enero
	2: 28, //febrero
	3: 31, //marzo
	4: 30, //abril
	5: 31, //mayo
	6: 30, //junio
	7: 31, //julio
	8: 31, //agosto
	9: 30, //septiembre
	10: 31, //octubre
	11: 30, //noviembre
	12: 31 //diciembre
}

const prom = 365 / 12;


function main () {
	const modal = new bootstrap.Modal('#app', {
	  keyboard: false
	});
	const action = document.getElementById('arrow');

	modal.show();
	action.addEventListener('click', calculateAges);
	
	jQuery('input').on( "blur", function() {
		validateData(this.id);  
	} );
}

function calculateAges() {
	console.log(validate);

	if(validate.day && validate.month && validate.year && validate.ok){
		console.info("Calculating age...");

		let now = new Date();
		let grub = new Date(year, month-1, day);

		let diffMs = now- grub.getTime();
		var diffAge = new Date(diffMs);

		let diffYears = diffAge.getUTCFullYear() - 1970;
		let diffDays = Math.ceil(diffMs / (1000 * 3600 * 24));
		let diffMonths = parseInt(diffDays/prom);
		
		let age = {
			years: diffYears,
			months: diffMonths,
			days: diffDays
		}

		console.info(age);
		showResults(age);


	}else{
		console.warn("Data incorrect...");
	}
}

function validateData(id) {
	// obj

	day = parseInt(jQuery("#dayInput").val());
	month = parseInt(jQuery("#monthInput").val());
	year = parseInt(jQuery("#yearInput").val());

	switch (id) {
		case 'dayInput':
				if(day >= 1 && day <= 31) {
					jQuery("#dayssection > .form-ages").removeClass('error');
					validate.days = true;
				}else{
					jQuery("#dayssection > .form-ages").addClass('error');
					jQuery("#dayssection > .message").html(mustbe + ' day');
					if (!day){jQuery("#dayssection > .message").html(msj);}
					validate.days = false;
				}
				
			break;
		case 'monthInput':

				if(month >= 1 && month <=12) {
					jQuery("#monthssection > .form-ages").removeClass('error');
					validate.months = true;
				}else{
					jQuery("#monthssection > .form-ages").addClass('error');
					jQuery("#monthssection > .message").html(mustbe + ' month');
					if (!month){jQuery("#monthssection > .message").html(msj);}
					validate.months = false;
				}

			break;
		case 'yearInput':

				if (year >= 1 && year <= currentYear) {
					jQuery("#yearssection > .form-ages").removeClass('error');
					validate.years = true;
				}else{
					jQuery("#yearssection > .form-ages").addClass('error');
					jQuery("#yearssection > .message").html('Must be in the past');
					if (!year) {jQuery("#yearssection > .message").html(msj);}
					validate.years = false;
				}

			break;

		default:
			// check days of the month
			break;
	}

	if ((day >= 1 && day <= 31) && (month >= 1 && month <=12)) {
		if (day <= daysMonths[month]) {
			validate.ok = true;
		}else{
			jQuery("#dayssection > .form-ages").addClass('error');
			jQuery("#dayssection > .message").html(mustbe + ' day');
			validate.days = false;
			validate.ok = false;

		}
	}

}

function showResults(age) {

	let objyears = jQuery("#years");
	let objmonths = jQuery("#months");
	let objdays = jQuery("#days");

	animateValue(objyears, 0, age.years, 5000);
	animateValue(objmonths, 0, age.months, 5000);
	animateValue(objdays, 0, age.days, 5000);

	
}


function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.html(Math.floor(progress * (end - start) + start));
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

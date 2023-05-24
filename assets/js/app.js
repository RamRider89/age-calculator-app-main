/**
 * age-calculator-app-main
 * Challenge by https://www.frontendmentor.io
 * Coded by Carlos David Duarte
 * Email: hola@davdav.tech
 * */

$(document).ready(function () {
	console.info('age-calculator-app-main');
	main();
});

let day, month, year;
const currentYear = new Date().getFullYear();
const cases = {
	day: {
		section: 'dayssection',
		start: 1,
		end: 31
	},
	month: {
		section: 'monthssection',
		start: 1,
		end: 12
	},
	year: {
		section: 'yearssection',
		start: 0,
		end: currentYear,
		trow: 1000
	}
}

let data = {
	day: 0,
	month: 0,
	year: 0
}

let validate = {
	day: false,
	month: false,
	year: false,
	dayvsmonth: false
}

let daysMonths = {
	0: 365, //NA
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

const prom = daysMonths[0] / 12;

let msj = {
	requiered: 'This field is requiered',
	day: 'Must be a valid day',
	month: 'Must be a valid month',
	year: 'Must be in the past'
}


function main () {
	const modal = new bootstrap.Modal('#app', {
	  keyboard: false
	});
	const action = document.getElementById('arrow');

	modal.show();
	action.addEventListener('click', calculateAges);
	
	$('input').on( "blur", function() {
		validateData(this);  
	} );

	$('.card').on( "click", function() {
		$(this).find('.collapse').collapse('toggle'); 
	});
}

function calculateAges() {
	console.log(validate);

	if(validate.day && validate.month && validate.year && validate.dayvsmonth){
		console.info("Calculating age:");

		let date, diff, duration, yearad;

		/* fix err. year AD 1000 */
		if (data.year >= cases.year.start && data.year < cases.year.trow) { 
			date = new Date(Date.UTC(data.year + cases.year.trow),(data.month-1),data.day);
			date.setUTCFullYear((data.year + cases.year.trow) - cases.year.trow);
		}else{
			date = moment(new Date(data.year, (data.month - 1), data.day));
		}
		
		diff = moment().diff(date, 'milliseconds');
  	duration = moment.duration(diff);
		
		let age = {
			now: {
				years: duration.years(),
				months: duration.months(),
				days: duration.days(),
			},
			time:{
				hours: duration.hours(),
				minutes: duration.minutes(),
				seconds: duration.seconds()
			},
			until : {
				months_until: parseInt(duration.asMonths()),
				days_until: parseInt(duration.asDays()),
				hours_until: parseInt(duration.asHours())
			}

		}

		console.info(age);
		showResults(age);

	}else{
		console.warn("Data incorrect.");
		reset();
	}
}


function validateData(obj) {
	// obj es el objeto $ del input en el evento
	data[obj.id] = parseInt(obj.value);

	// VALIDATE DATA
	if(data[obj.id] >= cases[obj.id].start && data[obj.id] <= cases[obj.id].end) {
		$("#" + cases[obj.id].section + " > .form-ages").removeClass('error');
		validate[obj.id] = true;

		// VALIDATE DAYS VS MONTHS
		if (data['day'] <= daysMonths[data['month']]) {
			validate.dayvsmonth = true;
		}else{
			toggleMessages('day');
			validate.dayvsmonth = false;
		}

	}else{
		toggleMessages(obj.id);
		if (!data[obj.id]){
			$("#" + cases[obj.id].section + " > .message").html(msj.requiered);
		}
	}

}

function toggleMessages(id){
	$("#" + cases[id].section + " > .form-ages").addClass('error');
	$("#" + cases[id].section + " > .message").html(msj[id]);
	validate[id] = false;
}

function showResults(age) {

	const objs = [
		[{object: $("#years_r"), data: age.now.years}],
		[{object: $("#months_r"), data: age.now.months}],
		[{object: $("#days_r"), data: age.now.days}],
		[{object: $("#hours_r"), data: age.time.hours}],
		[{object: $("#minutes_r"), data: age.time.minutes}],
		[{object: $("#seconds_r"), data: age.time.seconds}],
		[{object: $('#months_until'), data: age.until.months_until}],
		[{object: $('#days_until'), data: age.until.days_until}],
		[{object: $('#hours_until'), data: age.until.hours_until}]
	]

	for(var i = 0; i < objs.length; i++){
		animateValue(objs[i][0].object, 0, objs[i][0].data, 3000);
	}

}

function reset() {
	$(".data").html('--');
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

console.log('Sensaura Script loaded');

let socialContainer = $('.header-menu-actions')[0];
let phoneDiv = "<div class=\"header-menu-actions-action header-menu-actions-action--social\"><a class=\"icon icon--lg icon--fill\" href=\"tel:(07)54735360\" target=\"_blank\" aria-label=\"\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" role=\"img\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path data-name=\"layer1\" d=\"M58.9 47l-10.4-6.8a4.8 4.8 0 0 0-6.5 1.3c-2.4 2.9-5.3 7.7-16.2-3.2S19.6 24.4 22.5 22a4.8 4.8 0 0 0 1.3-6.5L17 5.1c-.9-1.3-2.1-3.4-4.9-3S2 6.6 2 15.6s7.1 20 16.8 29.7S39.5 62 48.4 62s13.2-8 13.5-10-1.7-4.1-3-5z\" fill=\"none\" stroke=\"#000\" stroke-miterlimit=\"10\" stroke-width=\"4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"></path></svg></a></div>"
if (socialContainer) $(socialContainer).append(phoneDiv);

function loadServices(data){
  console.log('loadServices')
  let html = '';
  for (let i = 0; i < data.items.length; i++){
    item = data.items[i];
    let itemRows = []
    item.items.forEach(function(subItem){
      itemRows.push(
        `<tr>` +
          `<td class="time">${subItem.time}</td>` +
          `<td class="price">${subItem.price}</td>` +
        `</tr>`
      )
    });
    html +=
      `<div class="row sqs-row">` +
        `<div class="col sqs-col-6 span-6">` +
          `<div class="sqs-block html-block sqs-block-html" data-block-type="2">` +
            `<div class="sqs-block-content">` +
              `<h3 style="white-space:pre-wrap;">${item.title}</h3>` +
            `</div>` +
          `</div>` +
        `</div>` +
        `<div class="col sqs-col-6 span-6">` +
          `<div class="sqs-block html-block sqs-block-html" data-block-type="2">` +
            `<div class="sqs-block-content">` +
              `<p class="" style="white-space:pre-wrap;">${item.description}</p>` +
            `</div>` +
            `<div class="sqs-block html-block sqs-block-html" data-block-type="2">` +
              `<div class="sqs-block-content">` +
                `<table class="voucher-price">` +
                  itemRows.join('') +
                `</table>` +
              `</div>` +
            `</div>` +
          `</div>` +
          `<div class="sqs-block button-block sqs-block-button">` +
            `<div class="sqs-block-content">` +
              `<div class="sqs-block-button-container--center" data-animation-role="button" data-alignment="center" data-button-size="small">` +
                `<a href="/book-now" class="sqs-block-button-element--small sqs-block-button-element" data-initialized="true">Book Now</a>` +
              `</div>` +
            `</div>` +
          `</div>` +
          ((i+1) < data.items.length ? `<hr />` : '') +
        `</div>` +
      `</div>`;
  }
  $('#service-html').html(html);
}

//load services from vouchers.json
$( document ).ready(function() {
  console.log('doc ready')
  const serviceDiv = $('#service-html');
  if (serviceDiv.length>0) {
    let serviceId = $('#service-html').attr('data-service')
    $.ajax({
      type: 'GET',
      url: 'https://raw.githubusercontent.com/benpetro/sensaura/main/vouchers.json',
      success: function(data){
        let json = JSON.parse(data);
        loadServices(json[parseInt(serviceId)]);
      }
    })
  }
})

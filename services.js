  // add to code injection on All pages (Settings > Advanced > Code Injection)
  $( document ).ready(function() {
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
  function loadServices(data){
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

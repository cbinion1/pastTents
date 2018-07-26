$('.upload-btn').on('click', function (){
  console.log('clicked!');
    $('#file-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

const fileInput = document.getElementById('file-input');

const fileList = [];

fileInput.addEventListener('change', function (e) {
  fileList = [];
  for (let i = 0; i < fileInput.files.length; i++) {
    fileList.push(fileInput.files[i]);
  }
});

const fileCatcher = document.getElementById('file-catcher');

fileCatcher.addEventListener('submit', function (e) {
  e.preventDefault();
  fileList.forEach(function (file) {
    sendFile(file);
  });
});

sendFile = function (file) {
  const formData = new FormData();
  const request = new XMLHttpRequest();

  formData.set('file', file);
  request.open("POST", 'https://jsonplaceholder.typicode.com/photos')
  request.send(formData);
};

// $('#upload-input').on('change', function(){

//   let files = $(this).get(0).files;

//   if (files.length > 0){

//     // create a FormData object which will be sent as the data payload in the
//     // AJAX request
//     let formData = new FormData();

//     // loop through all the selected files and add them to the formData object
//     for (let i = 0; i < files.length; i++) {
//       let file = files[i];

//       // add the files to formData object for the data payload
//       formData.append('uploads[]', file, file.name);
//     }

//     $.ajax({
//       url: '/upload',
//       type: 'POST',
//       data: formData,
//       processData: false,
//       contentType: false,
//       success: function(data){
//           console.log('upload successful!\n' + data);
//       },
//       xhr: function() {
//         // create an XMLHttpRequest
//         let xhr = new XMLHttpRequest();

//         // listen to the 'progress' event
//         xhr.upload.addEventListener('progress', function(evt) {

//           if (evt.lengthComputable) {
//             // calculate the percentage of upload completed
//             let percentComplete = evt.loaded / evt.total;
//             percentComplete = parseInt(percentComplete * 100);

//             // update the Bootstrap progress bar with the new percentage
//             $('.progress-bar').text(percentComplete + '%');
//             $('.progress-bar').width(percentComplete + '%');

//             // once the upload reaches 100%, set the progress bar text to done
//             if (percentComplete === 100) {
//               $('.progress-bar').html('Done');
//             }

//           }

//         }, false);

//         return xhr;
//       }
//     });

//   }
// });
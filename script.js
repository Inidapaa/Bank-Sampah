const close = document.getElementById('close');
const bar = document.getElementById('bar');
const nav = document.getElementById('links');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

// =====OUTPUT FORM SPREEDSHEAT=====
const scriptURL =
        "https://script.google.com/macros/s/AKfycbywoAXaT0leOQHe9X5CgZQtuuDlDA12qUuZkzio3jNOY6fmx0zKwlplgcRiNEW9n-2l/exec";
      const form = document.forms["submit-to-google-sheet"];

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then(response => response.text()) // Menangani response sebagai text
        .then(data => {
          alert('Data berhasil dikirim!');
          console.log('Response:', data); // Log response success
          // Reset form setelah data terkirim
          document.getElementById('feedbackForm').reset();
        })
        .catch(error => {
          console.error('Error!', error.message); // Pesan error
          alert('Terjadi kesalahan!');
        });
      });

// document.getElementById('feedbackForm').addEventListener('submit', function(event) {
//   event.preventDefault();
  
//   // Ambil data dari form
//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const phone = document.getElementById('phone').value;
//   const message = document.getElementById('message').value;

//   // URL dari Apps Script yang sudah di-deploy
//   const scriptURL = 'https://script.google.com/macros/library/d/1USVBETSqd2qzqSb6z_w8nbXsq86TChBqTfDwcxkbTLNJSEYaKaAOU2lm/3';

//   // Kirim data menggunakan fetch API
//   fetch(scriptURL, {
//     method: 'POST',
//     body: JSON.stringify({ name, email, phone, message }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(response => response.text()) // Menangani response sebagai text
//     .then(data => {
//       alert('Data berhasil dikirim!');
//       console.log('Response:', data); // Log response untuk debugging
//       // Reset form setelah data terkirim
//       document.getElementById('feedbackForm').reset();
//     })
//     .catch(error => {
//       console.error('Error!', error.message); // Menangani error jika terjadi
//       alert('Terjadi kesalahan! Periksa console untuk detail');
//     });
// });




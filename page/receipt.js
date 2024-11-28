// =====OUTTPUT FORM=====
document.addEventListener("DOMContentLoaded", function () {
  const date = new Date().toLocaleDateString("id-ID");
  document.getElementById("date").textContent = date;

  const receiptData = JSON.parse(localStorage.getItem("receiptData")) || [];
  const receiptTableBody = document.getElementById("receiptData");
  let grandTotal = 0; // Inisialisasi total keseluruhan harga

  receiptData.forEach((data) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${data.name}</td>
              <td>${data.class}</td>
              <td>${data.wasteType}</td>
              <td>${data.amount}</td>
              <td>Rp ${data.totalPrice.toLocaleString()}</td>
          `;
    receiptTableBody.appendChild(row);

    // Tambahkan ke total keseluruhan harga
    grandTotal += data.totalPrice;
  });

  // Tampilkan total keseluruhan harga
  document.getElementById("grandTotal").textContent = `Rp ${grandTotal.toLocaleString()}`;

  // Cetak otomatis saat halaman dimuat
  window.print();
});


// =====CRUD FORM=====
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('wasteForm');
  const tableBody = document.querySelector('#sellerDataTable tbody');
  const receiptButton = document.getElementById('printReceipt');

  // Function untuk menghitung harga/kg
  function calculatePrice(type, amount) {
    const prices = {
      Plastik: 5000,
      Kertas: 3000,
      Logam: 8000
    };
    return prices[type] * amount;
  }

  // Function untuk menambahkan baris tabel
  function addRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.class}</td>
      <td>${data.type}</td>
      <td>${data.amount} Kg</td>
      <td>Rp ${data.totalPrice.toLocaleString()}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Hapus</button>
      </td>
    `;
    tableBody.appendChild(row);
  
    // Event Listener untuk Delete
    row.querySelector('.delete-btn').addEventListener('click', () => {
      row.remove();
    });
  
    // Event Listener untuk Edit
    row.querySelector('.edit-btn').addEventListener('click', () => {
      editRow(data, row);
    });
  }  

  function editRow(data, row) {
    // Menisi form fields dengan data yang ada
    document.getElementById('name').value = data.name;
    document.getElementById('class').value = data.class;
    document.getElementById('wasteType').value = data.type;
    document.getElementById('amount').value = data.amount;
  
    // Update form submission event untuk meng-edit baris
    form.removeEventListener('submit', addNewData);
    form.addEventListener('submit', function updateRow(e) {
      e.preventDefault();
  
      // Menerima data yang sudah di update dari form
      data.name = document.getElementById('name').value;
      data.class = document.getElementById('class').value;
      data.type = document.getElementById('wasteType').value;
      data.amount = parseInt(document.getElementById('amount').value, 10);
      data.totalPrice = calculatePrice(data.type, data.amount);
  
      // Update row content
      row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.class}</td>
        <td>${data.type}</td>
        <td>${data.amount} Kg</td>
        <td>Rp ${data.totalPrice.toLocaleString()}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Hapus</button>
        </td>
      `;
  
      // Menambahka ulang event listeners untuk baris terbaru
      row.querySelector('.delete-btn').addEventListener('click', () => {
        row.remove();
      });
  
      row.querySelector('.edit-btn').addEventListener('click', () => {
        editRow(data, row);
      });
  
      // Reset form dan restore original add event listener
      form.reset();
      form.removeEventListener('submit', updateRow);
      form.addEventListener('submit', addNewData);
    });
  }
  
  // Function untuk menambahkan data baru ke submit agar dapat disimpan di localStorage
  function addNewData(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const classData = document.getElementById('class').value;
    const wasteType = document.getElementById('wasteType').value;
    const amount = parseInt(document.getElementById('amount').value, 10);
    const totalPrice = calculatePrice(wasteType, amount);
  
    const formData = {
      name,
      class: classData,
      type: wasteType,
      amount,
      totalPrice
    };
  
    addRow(formData);
    form.reset();
  }
  
  // Menggunakan addNewData function untuk menginisialisasi form submissions
  form.addEventListener('submit', addNewData);
  
  
  // kirim data ke local storage dan reset form
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const classData = document.getElementById('class').value;
    const wasteType = document.getElementById('wasteType').value;
    const amount = parseInt(document.getElementById('amount').value, 10);
    const totalPrice = calculatePrice(wasteType, amount);
  
    const formData = {
      name,
      class: classData,
      type: wasteType,
      amount,
      totalPrice
    };
  
    if (isEditing && currentRow) {
      // Update baris yang ada
      currentRow.innerHTML = `
        <td>${formData.name}</td>
        <td>${formData.class}</td>
        <td>${formData.type}</td>
        <td>${formData.amount} Kg</td>
        <td>Rp ${formData.totalPrice.toLocaleString()}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Hapus</button>
        </td>
      `;
  
      // Menambahkan kembali event listeners untuk baris yang sudah di edit
      currentRow.querySelector('.delete-btn').addEventListener('click', () => {
        currentRow.remove();
      });
  
      currentRow.querySelector('.edit-btn').addEventListener('click', () => {
        editRow(formData, currentRow);
      });
  
      // Reset setelah di edit
      isEditing = false;
      currentRow = null;
    } else {
      // Menambahkan baris baru ketika tidak di edit
      addRow(formData);
    }
  
    // Reset form
    form.reset();
  });  
});


document.getElementById('printReceipt').addEventListener('click', function () {
    // Mengambil data dari tabel penjual
    const sellerDataTable = document.querySelectorAll('#sellerDataTable tbody tr');
    const receiptData = [];

    sellerDataTable.forEach(row => {
        const cells = row.querySelectorAll('td');
        const data = {
            name: cells[0].textContent,
            class: cells[1].textContent,
            wasteType: cells[2].textContent,
            amount: parseFloat(cells[3].textContent),
            totalPrice: parseInt(cells[4].textContent.replace(/[^0-9]/g, ''), 10)
        };
        receiptData.push(data);
    });

    // Simpan data ke localStorage untuk diteruskan ke halaman receipt.html
    localStorage.setItem('receiptData', JSON.stringify(receiptData));

    // Buka halaman struk
    window.open('receipt.html', '_blank');
});

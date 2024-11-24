// Mengambil data dari localStorage dan menampilkan pada struk
document.addEventListener("DOMContentLoaded", function () {
  const date = new Date().toLocaleDateString("id-ID");
  document.getElementById("date").textContent = date;

  const receiptData =
    JSON.parse(localStorage.getItem("receiptData")) || [];
  const receiptTableBody = document.getElementById("receiptData");

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
  });

  // Cetak otomatis saat halaman dimuat
  window.print();
});

// =====OUTPUT FORM=====
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('wasteForm');
  const tableBody = document.querySelector('#sellerDataTable tbody');
  const receiptButton = document.getElementById('printReceipt');

  // Function to calculate the price per kilogram
  function calculatePrice(type, amount) {
    const prices = {
      Plastik: 5000,
      Kertas: 3000,
      Logam: 8000
    };
    return prices[type] * amount;
  }

  // Function to add a new row to the table
  function addRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.class}</td>
      <td>${data.type}</td>
      <td>${data.amount} Kg</td>
      <td>Rp ${data.totalPrice.toLocaleString()}</td>
      <td>
        <button class="delete-btn">Hapus</button>
      </td>
    `;
    tableBody.appendChild(row);

    row.querySelector('.delete-btn').addEventListener('click', () => {
      row.remove();
    });
  }

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

    addRow(formData);

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

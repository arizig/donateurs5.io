function generateAmount() {
  return (Math.random() * 1000).toFixed(2);
}

let donors = [];
let sortAsc = true;

fetch('https://randomuser.me/api/?results=20')
  .then(res => res.json())
  .then(data => {
    donors = data.results.map(user => ({
      name: `${user.name.first} ${user.name.last}`,
      firstName: user.name.first,
      gender: user.gender,
      phone: user.phone,
      location: `${user.location.city}, ${user.location.country}`,
      picture: user.picture.medium,
      amount: parseFloat(generateAmount())
    }));
    displayDonors(donors);
  });

  function displayDonors(list) {
  const container = document.getElementById('donor-list');
  container.innerHTML = '';
  list.forEach(donor => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="amount">${donor.amount.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}</div>
      <img src="${donor.picture}" alt="Profile picture">
      <h3>${donor.name}</h3>
      <p class="location">📍 ${donor.location}</p>
      <p class="phone">📞 ${donor.phone}</p>
    `;
    container.appendChild(card);
  });
}

document.querySelectorAll('input[name="gender"]').forEach(radio => {
  radio.addEventListener('change', () => filterDonors());
});

function filterDonors() {
  const selectedGender = document.querySelector('input[name="gender"]:checked').value;
  const filtered = selectedGender === 'all' ? donors : donors.filter(d => d.gender === selectedGender);
  displayDonors(filtered);
}

function toggleSortAmount() {
  sortAsc = !sortAsc;
  const sorted = [...donors].sort((a, b) =>
    sortAsc ? a.amount - b.amount : b.amount - a.amount
  );
  displayDonors(sorted);
}
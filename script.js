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
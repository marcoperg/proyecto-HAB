// POST - /visits
async function newVisit() {}

// PUT - /visits/:id
async function addPlate() {}

// POST - /visits/:id
async function checkout() {}

// POST - /visits/:id/paid
async function paid() {}

// POST - /visits/:id/call
async function callWaiter() {}

// POST - /visits/:id/rate
async function rateVisit() {}

module.exports = {
	newVisit,
	addPlate,
	checkout,
	paid,
	callWaiter,
	rateVisit,
};

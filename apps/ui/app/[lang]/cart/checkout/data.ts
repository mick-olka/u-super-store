const m = [
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"10",
	"11",
	"12",
];
export const monthsList = m.map((m) => ({ name: m, value: m }));

const y = [
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"30",
	"31",
	"32",
	"33",
	"34",
	"35",
];
export const yearsList = y.map((y) => ({ name: `20${y}`, value: y }));

import { existsSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";

export const deleteFile = (path: string) => {
	if (!path) console.log("====== FILE NOT FOUND =======");
	else if (existsSync(join("upload", path))) {
		unlinkSync(join("upload", path));
		return 0;
	} else return 1;
};

export const getAllFiles = () => {
	return readdirSync(join("upload"));
};

import * as moment from "moment";
import fetch from "node-fetch";
import { ProxyList } from "./ProxyList";
import type { Proxy } from "./Proxy";

const URL = "http://spys.me/proxy.txt";

export const downloadProxyList: DownloadProxyList = () =>
	fetch(URL)
		.then((res) => res.text())
		.then((text) => parseProxyListText(text));

function parseProxyListText(text: string): ProxyList {
	const allLines = text.split("\n");
	const headerIndentLineIndex = allLines.indexOf("");
	const headerExtraLinesToCut = 1;
	const footerIndentLineIndex = allLines.lastIndexOf("\r");
	const proxyLines = allLines.slice(
		headerIndentLineIndex + headerExtraLinesToCut,
		footerIndentLineIndex
	);
	const proxies = proxyLines.map((v) => parseProxyLine(v));
	const firstLineIndex = 0;
	const firstLine = allLines[firstLineIndex];

	return new ProxyList(parseProxyListUpdateDate(firstLine), proxies);
}

function parseProxyLine(proxyLine: string): Proxy {
	const [address, description, googlePassed] = proxyLine.split(" ");
	const [countryCode, anonymous, SSLSupport] = description.replace("!", "").split("-");

	return {
		address: address.trim(),
		description: {
			googlePassed: googlePassed.trim() === "+",
			countryCode: countryCode.trim(),
			anonymous: anonymous.trim() !== "N",
			SSLSupport: !!SSLSupport && SSLSupport.trim() === "S"
		}
	};
}

function parseProxyListUpdateDate(firstLine: string): moment.Moment {
	const parsedFirstLine = /updated at (.*)/.exec(firstLine);

	if (!parsedFirstLine) {
		throw new Error("unable to parse a date");
	}

	const parsedDateIndex = 1;
	const parsedDate = parsedFirstLine[parsedDateIndex];

	return moment(parsedDate, "ddd, DD MMM YY HH:mm:ss Z");
}

export type DownloadProxyList = () => Promise<ProxyList>;

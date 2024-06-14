import { ErrorRequest, Link, StatisticsAPI } from "./types"

const SHORTENER_API_KEY = process.env.SHORTENER_API_KEY

/**
 * Configuration of the headers for the request to the API
 */
const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${SHORTENER_API_KEY}`
}

/**
 * Shorten a link and return the new link information.
 * @param source The link to be shortened
 */
export const shortenerUrl = async (source: string): Promise<Link | ErrorRequest> => {
    const request = await fetch("https://api.t.ly/api/v1/link/shorten", {
        method: "POST",
        headers,
        body: JSON.stringify({
            "long_url": source,
        })
    })
    return await request.json() as Link
}


/**
 *  Gets the statistics of a previously created shortened link.
 * 
 * @param source The shortened link from which the statistics are to be obtained
 */
export const getStats = async (source: string): Promise<StatisticsAPI | ErrorRequest> => {
    const request = await fetch(`https://api.t.ly/api/v1/link/stats?short_url=${source}`, {
        method: "GET",
        headers
    })
    return await request.json() as StatisticsAPI
}
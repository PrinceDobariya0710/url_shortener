import supabase, { supabaseUrl } from "./supabase";
import { UAParser } from "ua-parser-js";

export async function getClicksForUrls(urlIds) {
    const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlIds);

    if (error) {
        console.log(error.message);
        throw new Error("Unable to fetch clicks data");
    }
    return data;
}

const parser = new UAParser();

export const storeClicks = async ({ id, originalUrl }) => {
    try {
        const res = parser.getResult();
        const devide = res.device.type || 'desktop';
        const response = await fetch("https://ipapi.co/json/");
        const { city, country_name: country } = await response.json();

        await supabase.from("clicks").insert({
            url_id: id,
            device: devide,
            city: city,
            country: country,
        });

        window.location.href = originalUrl;

    }
    catch (err) {
        console.log("Error storing click data", err);
    }
}

export async function getClicksForUrl(url_id) {
    const { data, error } = await supabase.from("clicks").select("*").eq("url_id", url_id);

    if (error) {
        console.log(error.message);
        throw new Error("Unable to fetch clicks data for url");
    }
    return data;
}
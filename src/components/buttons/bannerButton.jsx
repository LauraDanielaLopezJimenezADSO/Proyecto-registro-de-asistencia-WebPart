import React from "react";
import "../../styles/ComponentStyles/bannerButtons.css"

export default function BannerButton({ texto }) {
  return <button className="banner__button">{texto}</button>;
}

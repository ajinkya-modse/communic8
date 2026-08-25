import React from "react";
import { GALLERY_IMAGES } from "../data/landingData";

const GALLERY_SLOTS = 20;

export default function GallerySection() {
  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <div className="gallery-intro">
        <span className="gallery-eyebrow">Inside Communic8</span>
        <h2 id="gallery-title">Work in progress.<br /><em>Growth in motion.</em></h2>
        <p>A collage of the people, shop floors, and conversations that move manufacturing brands forward.</p>
      </div>

      <div className="gallery-sliders" aria-label="Communic8 photo gallery">
        {[0, 1].map((row) => {
          const rowImages = Array.from({ length: GALLERY_SLOTS / 2 }, (_, index) => GALLERY_IMAGES[row * 10 + index]);
          return (
            <div className={`gallery-slider gallery-slider-${row + 1}`} role="list" key={row}>
              <div className="gallery-track">
                {[...rowImages, ...rowImages].map((image, index) => (
                  <div className={`gallery-tile ${image ? "has-image" : ""}`} role="listitem" key={index}>
                    {image && <img src={image.src} alt={image.alt || "Communic8 at work"} loading="lazy" decoding="async" />}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

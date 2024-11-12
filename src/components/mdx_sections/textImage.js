import React, { useEffect, useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import * as runtime from "react/jsx-runtime";
import { compileSync, runSync } from "@mdx-js/mdx";

function compileMDX(mdx) {
  const code = String(
    compileSync(mdx, {
      outputFormat: "function-body",
      development: false,
    })
  );

  return code;
}

const TextImage = ({ id, text, image, title, order }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    const code = compileMDX(text);

    const { default: Content } = runSync(code, runtime);
    setContent(Content());
  }, []);

  return (
    <section id={id}>
      <div class="flex-row d-flex align-items-center">
        {image && (
          <div class="col-md-6 main-content-img" data-aos="fade-up">
            <GatsbyImage image={image} alt="Image" />
          </div>
        )}
        <div class="col-md-6 main-content-text align-items-center" data-aos="fade-up">
          <p class="main-content-title">{title && title}</p>
          {content && content}
        </div>
      </div>
    </section>
  );
};

export default TextImage;

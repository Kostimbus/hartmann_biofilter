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

const TextImage = ({ id, text, image }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    const code = compileMDX(text);

    const { default: Content } = runSync(code, runtime);
    setContent(Content());
  }, []);

  return (
    <section id={id}>
      <div class="container flex-row d-flex">
        {image && (
          <div class="col-md-4" data-aos="fade-up">
            <GatsbyImage image={image} alt="Image" width={250} />
          </div>
        )}
        <div class="col-md-5" data-aos="fade-up">
          {content && content}
        </div>
      </div>
    </section>
  );
};

export default TextImage;

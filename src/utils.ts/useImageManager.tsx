import { useState, useEffect } from "react";
import * as ImageManipulator from "expo-image-manipulator";

type ManipulateOptions = {
    image: string;
    options: {
      width?: number;
      height?: number;
      rotate?: number;
      compress?: number;
      format: "jpeg" | "png" | "webp";
    };
};

export function useImageManager() {
  const [error, setError] = useState<string | null>(null);
  const [manipulatedImage, setManipulatedImage] = useState<ManipulateOptions>({image: '', options: {format: 'jpeg'}});
  const manipulator = ImageManipulator.useImageManipulator(manipulatedImage.image);
  const [renderedImage, setRenderedImage] = useState<string>("");

  useEffect(() => {
    if (manipulatedImage) {
      performManipulation();
    }
  }, [manipulatedImage]);

  const performManipulation = async () => {
    const resized = await manipulator.resize(manipulatedImage.options); // Renders the current state of the image
    const rendered = await resized.renderAsync();
    const saved = await rendered.saveAsync({ compress: manipulatedImage.options.compress, format: manipulatedImage.options.format.toLowerCase() as ImageManipulator.SaveFormat }); // Save
    setRenderedImage(saved.uri);
  };

  return { setManipulatedImage, error, renderedImage };
}

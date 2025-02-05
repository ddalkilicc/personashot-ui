"use client";

import styles from "./page.module.scss";
import "@/app/globals.css";
import FeatherIcon from "feather-icons-react";
import { useRef, useState } from "react";
import PersonaItem from "./components/personaItem";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import classNames from "classnames";
import { Button } from "@/components/ui/button";

export default function Home() {
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generateImage, setGenerateImage] = useState(false);
  const [fileName, setFileName] = useState("");
  const [imageDetails, setImageDetails] = useState({
    width: "",
    height: "",
    description: "",
    format: "jpg",
    generatePrompt: "",
  });

  const imageKeys = [
    {
      group: "A",
      image: `/images/${fileName}/a.png`,
      prompt: "A",
      tags: "",
      time: 4000,
    },
    {
      group: "B",
      image: `/images/${fileName}/b.png`,
      prompt: "B",
      tags: "",
      time: 8000,
    },
    {
      group: "C",
      image: `/images/${fileName}/c.png`,
      prompt: "C",
      tags: "",
      time: 10000,
    },
    {
      group: "D",
      image: `/images/${fileName}/d.png`,
      prompt: "D",
      tags: "",
      time: 12000,
    },
    {
      group: "E",
      image: `/images/${fileName}/e.png`,
      prompt: "E",
      tags: "",
      time: 14000,
    },
  ];

  const options: {
    [key: string]: { width: number; height: number; prompt: string };
  } = {
    bag: {
      prompt: "on a simple table next to a newspapers journals",
      width: 1200,
      height: 1200,
    },
    shoes: {
      prompt:
        "resting on an urban sidewalk, highlighting the intricate texture of the shoe against a city backdrop",
      width: 1480,
      height: 1480,
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setImageDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormatChange = (value: string) => {
    setImageDetails((prev) => ({
      ...prev,
      format: value,
    }));
  };

  const handleImageUpload = () => {
    if (imageRef.current) {
      imageRef.current.value = "";
      imageRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = file?.name.split(".")[0] || "";
    setFileName(name);
    setLoading(true);
    setGenerateImage(false);
    setSelectedImage(null);
    if (file) {
      setTimeout(() => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          setSelectedImage(fileReader.result as string);
        };
        setLoading(false);
      }, 2000);
    }
  };

  const handleGenerateImage = () => {
    setGenerateImage(true);
  };

  return (
    <main className={styles.main}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.loader}></div>
        </div>
      )}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="https://boyner-stook-frontend.mncdn.com/web-ui/logo.svg"
            alt="logo"
            width={200}
            height={200}
          />
        </div>
        <span>PERSONASHOT</span>
      </header>
      <section className={styles.section}>
        <article className={styles.imageUploader}>
          <div
            className={classNames(styles.uploader, {
              [styles.uploaded]: selectedImage,
            })}
            onClick={handleImageUpload}
          >
            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="selectedImage"
                width={550}
                height={300}
                objectFit="contain"
              />
            ) : (
              <>
                <div className={styles.uploadText}>
                  <FeatherIcon icon="upload" />
                  Upload
                </div>
              </>
            )}
          </div>
          <div className={styles.imageOptions}>
            <div className={styles.title}>
              <h2>Image Settings</h2>
            </div>
            <div className={styles.optionsGrid}>
              <div className={styles.optionItem}>
                <Label htmlFor="width">Image Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  name="width"
                  value={
                    selectedImage && fileName
                      ? options[fileName].width
                      : imageDetails.width
                  }
                  onChange={handleInputChange}
                  placeholder="Image Width (px)"
                />
              </div>
              <div className={styles.optionItem}>
                <Label htmlFor="height">Image Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  name="height"
                  value={
                    selectedImage && fileName
                      ? options[fileName].height
                      : imageDetails.height
                  }
                  onChange={handleInputChange}
                  placeholder="Image Height (px)"
                />
              </div>
              <div className={styles.optionItem}>
                <Label>Image Format</Label>
                <Select
                  value={imageDetails.format}
                  onValueChange={handleFormatChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                    <SelectItem value="gif">GIF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className={styles.optionItem}>
                <Label htmlFor="description">Prompt</Label>
                <Input
                  id="description"
                  type="text"
                  name="description"
                  value={
                    selectedImage && fileName
                      ? options[fileName].prompt
                      : imageDetails.generatePrompt
                  }
                  onChange={handleInputChange}
                  placeholder="Image Description"
                />
              </div>
              <div className={classNames(styles.optionItem, styles.fullWidth)}>
                <Button variant={"default"} onClick={handleGenerateImage}>
                  Generate Image
                </Button>
              </div>
            </div>
          </div>
        </article>
        <article className={styles.personeImages}>
          <div className={styles.title}>
            <h1>Image List</h1>
          </div>
          {selectedImage && generateImage ? (
            <div className={styles.personas}>
              {imageKeys.map(({ group, image, time }, index) => (
                <PersonaItem
                  key={index}
                  name={group}
                  image={image}
                  isLoading={false}
                  time={time}
                />
              ))}
            </div>
          ) : (
            <div className={styles.personas}>
              <div className={styles.noImage}>
                <h1>No image selected</h1>
              </div>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

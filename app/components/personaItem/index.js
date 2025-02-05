import classNames from "classnames";
import styles from "./style.module.scss";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FeatherIcon from "feather-icons-react";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const PersonaItem = ({ name, image, isLoading, time }) => {
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setSelectedImages(image);
    }, time);
  }, [time]);

  return (
    <>
      <div
        className={classNames(styles.personaItem, {
          [styles.loading]: isLoading,
        })}
      >
        <div className={styles.share}>
          <Button variant="secondary">
            <FeatherIcon icon="share" />
          </Button>
        </div>
        <div className={styles.char}>{name}</div>
        {!selectedImages && <div className={styles.loader} />}
        {selectedImages && (
          <Image
            src={selectedImages}
            alt="logo"
            width={350}
            height={400}
            sizes="100vw"
            objectFit="contain"
            onClick={() => setOpen(true)}
          />
        )}
        <div className={styles.options}>
          <Button variant="default">
            <FeatherIcon icon="refresh-cw" />
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <Image src={selectedImages} alt="logo" width={600} height={900} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PersonaItem;

import React from "react";
import { match } from "ts-pattern";

import "./App.css";
import { CarouselEditor } from "./components/CarouselEditor";
import { DraggableList } from "./components/DraggableList";
import { ImageEditor } from "./components/ImageEditor";
import { PreviewPane } from "./components/PreviewPane";
import { TextEditor } from "./components/TextEditor";
import { useEditor } from "./hooks/useEditor";

const App = () => {
  const {
    components,
    activeId,
    activeComponent,
    setActiveComponent,
    addComponent,
    updateComponent,
  } = useEditor();

  return (
    <div className="app">
      <div className="sidebar">
        <DraggableList 
          items={[
            {
              type: "text",
              label: "Text Component",
              defaultProps: { text: "Hello World" },
              thumbnail: (
                <span
                  role="img"
                  aria-label="Text component thumbnail"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    marginRight: "10px",
                    background: "#f0f0f0",
                    borderRadius: "4px",
                    fontWeight: "bold"
                  }}
                >
                  T
                </span>
              )
            },
            {
              type: "image",
              label: "Image Component",
              defaultProps: {
                src: "https://via.placeholder.com/150x150/CCCCCC/666666?text=Custom+Image",
                width: "150px",
                height: "150px",
              },
              thumbnail: (
                <img
                  src="https://via.placeholder.com/150x150/CCCCCC/666666?text=Custom+Image"
                  role="img"
                  alt="Image component thumbnail"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "10px"
                  }}
                />
              )
            },
            {
              type: "carousel",
              label: "Carousel Component",
              defaultProps: {
                images: [
                  "https://via.placeholder.com/300x200/FF5733/FFFFFF?text=Slide+1",
                  "https://via.placeholder.com/300x200/5733FF/FFFFFF?text=Slide+2",
                  "https://via.placeholder.com/300x200/5733FF/FFFFFF?text=Slide+3"
                ]
              },
              thumbnail: (
                <span
                  role="img"
                  aria-label="Carousel component thumbnail"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    marginRight: "10px",
                    background: "#f0f0f0",
                    borderRadius: "4px",
                    fontWeight: "bold"
                  }}
                >
                  ◎
                </span>
              )
            }
          ]} 
        />
        {match(activeComponent)
          .with({ type: "text" }, ({ props }) => (
            <TextEditor
              text={props.text}
              onChange={(text) => updateComponent(activeId, { text })}
            />
          ))
          .with({ type: "image" }, ({ props }) => (
            <ImageEditor
              src={props.src}
              width={props.width}
              height={props.height}
              onChange={(props) => updateComponent(activeId, props)}
            />
          ))
          .with({ type: "carousel" }, ({ props }) => (
            <CarouselEditor
              images={props.images}
              onChange={(props) => updateComponent(activeId, props)}
            />
          ))
          .otherwise(() => null)}
      </div>
      <div className="main">
        <PreviewPane
          items={components.map((component) => ({
            ...component,
            active: component.id === activeId,
          }))}
          onDrop={(event) => {
            event.preventDefault();
            try {
              const data = event.dataTransfer?.getData("application/json");
              if (data) {
                addComponent(JSON.parse(data));
              }
            } catch (error) {
              console.error("Drop failed:", error);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onSelect={setActiveComponent}
        />
      </div>
    </div>
  );
};

export default App;

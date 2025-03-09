import React, { useState, useEffect } from 'react';
import { GalleryContainer, MainImage, Thumbnails } from './styled';

export default function Gallery({ images = [], videos = [] }) {
    const [selectedMedia, setSelectedMedia] = useState(null);

    useEffect(() => {
        // Verifica se existe trailer e, se sim, configura como a mídia principal
        const hasTrailer = videos.find((video) => video.type === 'Trailer');

        if (hasTrailer) {
            setSelectedMedia({ type: 'video', key: hasTrailer.key });
        } else if (images.length > 0) {
            // Caso não haja trailer, mostra a primeira imagem como padrão
            setSelectedMedia({
                type: 'image',
                file_path: images[0]?.file_path,
            });
        }
    }, [images, videos]);

    // Caso não haja vídeo nem imagem, exibe uma imagem padrão
    const trailerImage =
        images.length > 0
            ? images[0].file_path
            : 'https://via.placeholder.com/200x300?text=No+Image';

    return (
        <GalleryContainer>
            <h1>Gallery</h1>
            <MainImage>
                {selectedMedia && selectedMedia.type === 'video' ? (
                    <iframe
                        width="780"
                        height="439"
                        src={`https://www.youtube.com/embed/${selectedMedia.key}`}
                        title="Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : selectedMedia && selectedMedia.type === 'image' ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w780${selectedMedia.file_path}`}
                        alt="Main"
                    />
                ) : (
                    <p>No media available</p>
                )}
            </MainImage>

            <Thumbnails>
                {videos.length > 0 && (
                    <div
                        className={`thumbnail ${selectedMedia?.type === 'video' ? 'active' : ''}`}
                        onClick={() =>
                            setSelectedMedia({
                                type: 'video',
                                key: videos.find(
                                    (video) => video.type === 'Trailer',
                                )?.key,
                            })
                        }
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w200${trailerImage}`}
                            alt="Trailer Thumbnail"
                            className={
                                selectedMedia?.type === 'video' ? 'active' : ''
                            }
                        />
                    </div>
                )}
                {images.slice(0, 10).map((image, index) => (
                    <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/w200${image.file_path}`}
                        alt={`Thumbnail ${index}`}
                        onClick={() =>
                            setSelectedMedia({
                                type: 'image',
                                file_path: image.file_path,
                            })
                        }
                        className={
                            selectedMedia?.type === 'image' &&
                            selectedMedia?.file_path === image.file_path
                                ? 'active'
                                : ''
                        }
                    />
                ))}
            </Thumbnails>
        </GalleryContainer>
    );
}

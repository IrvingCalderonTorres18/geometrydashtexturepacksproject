import React from 'react';
import PlatformIcon from '../icons/platform.svg';
import AndroidIcon from '../icons/android.svg';
import GeodeIcon from '../icons/geode.svg';
import VersionIcon from '../icons/version.svg';
import { ReactComponent as GraphicsSvg } from '../icons/graphics.svg';
import ImageCarousel from './ImageCarousel';
import EmblaCarousel from './EmblaCarousel';

const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const DownloadZone = () => {
    return (
        <section className="row2 flex flex-col md:flex-row min-w-0">
            <div className="w-full">
                <div className="gd-card p-5 bg-[#111] rounded-md w-full box-border">

                    <div className="content">
                        <h1 className="title">Download Zone
                            <div className="aurora">
                                <div className="aurora__item"></div>
                                <div className="aurora__item"></div>
                                <div className="aurora__item"></div>
                                <div className="aurora__item"></div>
                            </div>
                        </h1>
                        <p className="text-2xl mb-14 text-center text-white/60">
                            Go and enjoy the different versions of the texture pack available for Geometry Dash
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Columna izquierda con video 16:9 */}
                        <div className="lg:w-1/2 w-full">
                        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                        </div>

                        {/* Columna derecha con el contenido */}
                        <div className="lg:w-1/2 w-full">
                            <div className="max-w-xl">
                                <div className="flex items-center">
                                    <div className="pack-icon bg-green-900 rounded-md w-16 h-16 flex items-center justify-center flex-shrink-0 mr-4">
                                        <i className="fas fa-cube text-3xl text-cyan-300"></i>
                                    </div>

                                    <div className="flex flex-col justify-start">
                                        <h1 className="text-2xl font-bold" style={{ color: '#7dff00' }}>
                                            Golden Texture Pack
                                        </h1>
                                        <h2 className="text-lg text-left" style={{ color: '#00ffff' }}>
                                            By Soluble
                                        </h2>
                                        <div className="flex gap-4 mb-3">
                                            <button className="px-2 rounded bg-gray-500 text-black text-xl text-white">1500</button>
                                            <button className="px-2 rounded bg-gray-500 text-black text-xl text-white">2500</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto mt-12">
                                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
                                    <div className="relative">
                                        <div className="absolute -top-12 left-0 px-6 py-2 bg-red-600 rounded-full text-sm text-white pulse-scale">
                                            Last Version
                                        </div>

                                        {/* Cambiado a una sola columna */}
                                        <div className="flex flex-col items-start gap-5">
                                            {/* Lado izquierdo (título + contenido adicional) */}
                                            <div className="w-full">
                                                <div className="flex items-center gap-4">
                                                    <h2 className="text-xl font-bold text-white text-left leading-snug"
                                                    style={{ color: '#7dff00' }}>
                                                        Geometry Dash 2.207 Texture Pack Golden By Soluble
                                                    </h2>
                                                </div>
                                                {/* Contenido adicional */}
                                                <div className="mt-3 flex items-center gap-2">
                                                    <GraphicsSvg className="w-6 h-6" style={{ fill: '#00ffff' }} />
                                                    <h3 className="text-xl font-semibold text-left" style={{ color: '#00ffff' }}>
                                                        v1.0 Texture Pack
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="h-[2px] w-full bg-gradient-to-r from-[#7dff00] to-[#00ffff] rounded-full"></div>
                                            {/* Fila exclusiva de 4 botones */}
                                            <div className="flex items-center gap-2">
                                                <img src={VersionIcon} alt="Version" className="w-6 h-6" />
                                                <h3 className="text-lg font-semibold text-left text-white/80">
                                                    Platforms available to download for Geometry Dash 2.207
                                                </h3>
                                            </div>
                                            <div className="w-full flex flex-row gap-4 justify-left">
                                                <button className="relative overflow-hidden flex items-center gap-2 py-2 px-3 rounded-xl transition text-sm button-download">
                                                <span className="button-content flex items-center gap-2 relative z-10 text-white font-semibold">
                                                    <img src={PlatformIcon} alt="PC" className="w-6 h-6" />
                                                    PC
                                                </span>
                                                <div className="hoverEffect">
                                                    <div></div>
                                                </div>
                                                </button>
                                                <button className="relative overflow-hidden flex items-center gap-2 py-2 px-3 rounded-xl transition text-sm button-download">
                                                <span className="button-content flex items-center gap-2 relative z-10 text-white font-semibold">
                                                    <img src={AndroidIcon} alt="Android" className="w-6 h-6" />
                                                    ANDROID
                                                </span>
                                                <div className="hoverEffect">
                                                    <div></div>
                                                </div>
                                                </button>
                                                <button className="relative overflow-hidden flex items-center gap-2 py-2 px-3 rounded-xl transition text-sm button-download">
                                                <span className="button-content flex items-center gap-2 relative z-10 text-white font-semibold">
                                                    <img src={AndroidIcon} alt="Android Hack" className="w-6 h-6" />
                                                    ANDROID HACK
                                                </span>    
                                                <div className="hoverEffect">
                                                    <div></div>
                                                </div>
                                                </button>
                                                <button className="relative overflow-hidden flex items-center gap-2 py-2 px-3 rounded-xl transition text-sm button-download">
                                                <span className="button-content flex items-center gap-2 relative z-10 text-white font-semibold">
                                                    <img src={GeodeIcon} alt="Geode" className="w-6 h-6" />
                                                    GEODE
                                                </span>
                                                <div className="hoverEffect">
                                                    <div></div>
                                                </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DownloadZone;

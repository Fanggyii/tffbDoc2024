import OpeningClosingFilmLabel from './OpeningClosingFilmLabel'
import Modal from './Modal'
import localFont from 'next/font/local'
import '../app/film.scss'
import { formatBerlinTime, sectionTitles } from '../utils/helpers'
import FilmEvent from './FilmEvent'
import CroppedImage from './CroppedImage'

const myFont = localFont({ src: '../fonts/terminal-grotesque-webfont.woff2' })

export default function Film(props) {
    const { id, film, language } = props
    let {
        ScreenTime,
        Place,
        MainImageUrl,
        SubImageUrls,
        ImageCropped,
        DirectorImageUrl,
        IsOpeningFilm,
        IsClosingFilm,
        Events,
        VenueLink,
        DirecotImageText,
    } = film
    // dropbox image url replacement
    MainImageUrl = MainImageUrl.replace(/&dl=0(?!.*&dl=0)/, "&raw=1");
    DirectorImageUrl = DirectorImageUrl.replace(/&dl=0(?!.*&dl=0)/, "&raw=1");
    SubImageUrls = SubImageUrls.split('\n').map(url => url.replace(/&dl=0(?!.*&dl=0)/, "&raw=1"))

    const name = film[`FilmName_${language}`]
    const director = film[`Director_${language}`]
    const synopsis = film[`Synopsis_${language}`]
    const themes = film[`Theme_${language}`]
    const genres = film[`Genre_${language}`]
    const directorIntro = film[`Director_Intro_${language}`]
    const mainImgAltText = film[`MainImageText_${language}`]
    let genre = film[`FilmInfo_${language}`]
    let prizes = film[`Prize_Nomination_${language}`]

    // let isOpeningFilm = film.isOpeningFilm
    prizes = prizes.split('\n')
    const { year, month, day, hour, minute } = formatBerlinTime(ScreenTime)

    return (
        <div>
            {/* using a checkbox + label and CSS to make an accordian, both X and label can toggle it */}
            <input type="checkbox" defaultChecked={IsOpeningFilm} id={id} className="film__checkbox"></input>
            <div className="film__item item w-full">
                {/* when accordion is close */}
                <label className={`film__toggle__area ${IsOpeningFilm && 'isOpeningFilm'} ${IsClosingFilm && 'isClosingFilm'}`} htmlFor={id}>
                    <h3 className={`film__name font-semibold ${IsOpeningFilm && 'bg-material md:bg-transparent'} ${IsClosingFilm && 'bg-material md:bg-transparent'}`}>{name}</h3>
                    {IsOpeningFilm && <OpeningClosingFilmLabel isOpening={IsOpeningFilm} language={language}></OpeningClosingFilmLabel>}
                    {IsClosingFilm && <OpeningClosingFilmLabel isClosing={IsClosingFilm} language={language}></OpeningClosingFilmLabel>}
                    <div className="film__date">{`${day}.${month}.${year}`}</div>
                    <div className="film__time">{`${hour}:${minute}`}</div>
                    <div className="film__place">
                        <h4>{Place}</h4>
                    </div>

                    <div className="cross">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                </label>

                {/* when accordion is open */}
                <div className="film__info lg:px-6">
                    <h3 className="name text-h1 text-primary font-sans font-semibold">{name}</h3>
                    <img src={MainImageUrl} className='mainImg' alt={mainImgAltText}/>
                    <Modal id={id} language={language} trailerUrl={'https://www.youtube.com/embed/kKsivrgoyDw'} venueLink={VenueLink}></Modal>
                    <div className='genres my-10'>{genre}</div>
                    <div className="themes">
                        {themes?.map(theme => <div className="bg-primary text-tertiary inline-block rounded-md px-5 py-2 mb-4 text-h4 font-sans font-medium theme"># {theme}</div>)}
                        {genres?.map(genre => <div className="bg-tertiary text-white inline-block rounded-md px-5 py-2 mb-4 text-h4 font-sans font-medium genre"># {genre}</div>)}
                    </div>
                    <div className='events'>
                        {Events?.map(event => <FilmEvent id={event.id} language={language} event={event.fields} />)}
                    </div>
                    
                    <p className="synopsis my-5">{synopsis}</p>
                    <div className='subImages flex gap-4 mt-4'>
                        {SubImageUrls?.map(imgUrl => <div><img src={imgUrl} className='' /></div>)}
                    </div>
                    
                    <ul className='prizes my-10 table'>
                        {prizes?.map(prize => <li className='block relative pl-5'>{prize}</li>)}
                    </ul>
                    
                    <h4 className="director text-h2 font-sans font-medium my-5 font-special">{director}</h4>
                    <CroppedImage src={DirectorImageUrl} alt={DirecotImageText} cropped={ImageCropped} moreClass='my-5' />
                    <p className='directorIntro'>{directorIntro}</p>
                </div>
            </div>
        </div>

    )
}
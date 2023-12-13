import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const API_KEY = `AIzaSyBYhrUPCRiXdzc6YvtSajglh9n3jMiPgg0`

const VideoDetail = () => {
  const { id } = useParams()

  const [videoDetail, setVideoDetail] = useState({})
  const [subsDetail, setSubsDetail] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Csnippet&id=${id}&key=${API_KEY}`)


        if (data.items?.length === 0) {
          setError(true)
          setLoading(false)
          return
        }

        const { data: subscriberCount } = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${data.items[0].snippet.channelId}&key=${API_KEY}`)


        setSubsDetail(subscriberCount)
        setVideoDetail(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }

    }
    fetchData()
  }, [id])

  console.log(videoDetail?.items)


  if (loading) return <p>Loading...</p>

  if (error || videoDetail?.items?.length === 0) return <div>
    <p>No video found by id: {id} <Link to="/">try again</Link></p>
  </div>




  const videoStats = videoDetail?.items && videoDetail?.items[0].statistics
  const channelStats = subsDetail?.items && subsDetail?.items[0].statistics

  let today = new Date(videoDetail?.items[0]?.snippet?.publishedAt);

  let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();



  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center gap-4 p-4 bg-slate-900 max-w-4xl mx-auto'>
        <div>
          <img src={videoDetail?.items[0]?.snippet?.thumbnails?.maxres
            ?.url} className='h-40 w-40 object-cover rounded' />
          <p>Uploaded on: {date}</p>
        </div>
        <div className='flex flex-col gap-4 border-l border-slate-300 px-2'>
          <p className='font-semibold text-lg '>{videoDetail?.items[0]?.snippet?.title}</p>
          <p className='flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
            <path d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z" fill="white" fillOpacity="0.8" />
          </svg><span>{videoStats?.viewCount}</span></p>
          <p className='flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M18 21.5H8V8.5L15 1.5L16.25 2.75C16.3667 2.86667 16.4627 3.025 16.538 3.225C16.6133 3.425 16.6507 3.61667 16.65 3.8V4.15L15.55 8.5H21C21.5333 8.5 22 8.7 22.4 9.1C22.8 9.5 23 9.96667 23 10.5V12.5C23 12.6167 22.9877 12.7417 22.963 12.875C22.9383 13.0083 22.9007 13.1333 22.85 13.25L19.85 20.3C19.7 20.6333 19.45 20.9167 19.1 21.15C18.75 21.3833 18.3833 21.5 18 21.5ZM6 8.5V21.5H2V8.5H6Z" fill="white" fillOpacity="0.8" />
          </svg>
            <span>{videoStats?.likeCount}</span> </p>
          <p className='flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M9 22.5C8.73478 22.5 8.48043 22.3946 8.29289 22.2071C8.10536 22.0196 8 21.7652 8 21.5V18.5H4C3.46957 18.5 2.96086 18.2893 2.58579 17.9142C2.21071 17.5391 2 17.0304 2 16.5V4.5C2 3.96957 2.21071 3.46086 2.58579 3.08579C2.96086 2.71071 3.46957 2.5 4 2.5H20C20.5304 2.5 21.0391 2.71071 21.4142 3.08579C21.7893 3.46086 22 3.96957 22 4.5V16.5C22 17.0304 21.7893 17.5391 21.4142 17.9142C21.0391 18.2893 20.5304 18.5 20 18.5H13.9L10.2 22.21C10 22.4 9.75 22.5 9.5 22.5H9Z" fill="white" fillOpacity="0.8" />
          </svg> <span>{videoStats?.commentCount}</span></p>
        </div>

        <div className='border-l border-slate-300 px-2 flex items-center justify-center  '>

          <div className='m-2 bg-slate-600 p-4 rounded '>

            Revenue : &#8377;{Math.min(channelStats?.subscriberCount
              , videoStats?.viewCount) + 10 * videoStats?.commentCount + 5 * videoStats?.likeCount}
          </div>

        </div>

      </div>
    </div>
  )
}

export default VideoDetail
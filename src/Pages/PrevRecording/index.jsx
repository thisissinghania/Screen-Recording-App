import { useEffect, useState, useRef } from "react"
import Header from "../../Components/Header/Header";
import Recordlist from "../../Components/Recordlist/Recordlist";
import "./style.css";
import ShareModel from "../../Components/ShareModel/ShareModel";
import { useGetPrevRecordMutation } from "../../API/PrevRecordAPI";
import spin from "../../assets/Rolling.svg"
const PrevRecording = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState()
  const [getPrevRecordData] = useGetPrevRecordMutation();

  const [start, setStart] = useState(0); // Track the start index for API call
  const [offset, setOffset] = useState(10); // Offset for each API call

  const loadingRef = useRef(null);


  useEffect(() => {
    getData();
  }, [])


  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      loadMoreData();
    }
  };

  const loadMoreData = () => {
    const newStart = start + offset;
    if (newStart < totalRecord) {
      setStart(newStart);
    } else {
      // If start exceeds total data count, set it to null
      setStart(null);
    }
  };

  useEffect(() => {
    // Create a new intersection observer when data changes
    if (data?.length > 0 && loadingRef.current) {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      });
      observer.observe(loadingRef.current);

      // Cleanup observer on component unmount
      return () => observer.disconnect();
    }
  }, [data]);


  useEffect(() => {

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);


  const handleCancel = () => {
    setIsOpen(false);
  };

  const shareVideoHandler = (data) => {
    setIsOpen(true);
    setModalData(data)
  }

  let getData = () => {
    if (start === null) return;
    const body = {
      start,
      offset,
    };
    setLoading && setLoading(true);
    getPrevRecordData(body)
      .then((data) => {
        setLoading && setLoading(false);
        if (data.error) {
          // throw data.error.message
          throw Error(data?.error?.message || "Unknown error occurred");
        }
        console.log("data>>>>>>>>>>>>>>>>>>", data.data)
        const newData = [...data?.data.resultSet];
        setData((prevData) => [...prevData, ...newData]);
        setTotalRecord(data?.data.totalRecords)
      })
      .catch((err) => {
        return Error(err);
      });
  };


  return (
    <>
      <div className="panel-block-recordings">
        <div>
          <h2 className="title">Previous Recordings</h2>
        </div>

        <div className="web_container_body_recording">

          {data && data.map((recording) => <Recordlist key={recording.id} recording={recording} onShareVideo={shareVideoHandler} />

          )}
          <div className="loader_container" ref={loadingRef}>{loading && <img className="ex_spinner" src={spin} />}</div>
        </div>
      </div>
      {isOpen && <ShareModel modalData={modalData} onClose={handleCancel} isOpen={isOpen} />}
    </>
  );
};

export default PrevRecording;

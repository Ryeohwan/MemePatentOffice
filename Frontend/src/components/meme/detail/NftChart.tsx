import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "hooks/useAxios";
import { ResponsiveLine } from "@nivo/line";
import { Icon } from "@iconify/react";
import styles from "./NftChart.module.css";
import { Serie } from "@nivo/line";

interface NftChartProps {
  tradeData: any;
}

const NftChart: React.FC<NftChartProps> = ({ tradeData }) => {
  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);

  // 거래날짜 : createdAt , 구매자 : nickName, 가격: price

  const [data, setData] = useState<Serie[]>();
  const [highestBid, setHighestBid] = useState<number>();
  const [lowestBid, setLowestBid] = useState<number>();

  useEffect(() => {
    console.log("하위페이지 tradeData", tradeData);
    let getData: Serie[];
    if (tradeData) {
      const newBuyerList = tradeData.buyerList.reverse().map((item: any) => {
        return { x: item.createdAt, y: item.price };
      });
      getData = [
        {
          id: memeid,
          data: newBuyerList,
        },
      ];
      console.log(getData);
      if (getData) setData(getData);
      setHighestBid(tradeData.highPrice);
      setLowestBid(tradeData.lowPrice);
    }
  }, [tradeData]);

  useEffect(() => {
    console.log("data바꿈", data);
  }, [data]);

  return (
    <>
      <div className={styles.bidWrapperDiv}>
        <div className={styles.bidWrapper}>
          <Icon icon="ph:arrow-line-up-bold" className={styles.priceArrow} />
          <span className={styles.bidText}>
            최고 낙찰가 &nbsp;&nbsp; {highestBid} SSF
          </span>
        </div>
        <div className={styles.bidWrapper}>
          <Icon icon="ph:arrow-line-down-bold" className={styles.priceArrow} />
          <span className={styles.bidText}>
            최저 낙찰가 &nbsp;&nbsp; {lowestBid} SSF
          </span>
        </div>
      </div>
      {data && tradeData && tradeData.buyerList.length > 0 ? (
        <ResponsiveLine
          data={data!}
          margin={{ top: 25, right: 15, bottom: 50, left: 35 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          enableGridX={false}
          enableGridY={true}
          lineWidth={1}
          colors={{ scheme: "category10" }}
          enablePoints={true}
          enableArea={false}
          areaOpacity={0.1}
          enableSlices="x"
          sliceTooltip={({ slice }) => {
            const format = (value: Date | number | string) => {
              const date = new Date(value);
              const formattedDate = `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
              return formattedDate;
            };

            return (
              <div className={styles.detailInfoBox}>
                <div>{format(slice.points[0].data.x)}</div>
                {slice.points.map((point) => (
                  <div
                    key={point.id}
                    style={{ color: point.serieColor, marginTop: "5px" }}
                  >
                    {point.data.yFormatted} SSF
                  </div>
                ))}
              </div>
            );
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              onClick: () => {},
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          axisBottom={{
            tickSize: 1,
            format: () => "",
          }}
        />
      ) : (
        <div className={styles.noTradeData}>
          <div>거래된 이력이 없습니다</div>
        </div>
      )}
    </>
  );
};

export default NftChart;

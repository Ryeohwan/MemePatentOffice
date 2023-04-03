import { ResponsiveLine } from '@nivo/line';
import { Icon } from "@iconify/react";
import styles from "./NftChart.module.css";

const NftChart = () => {

  // 거래내역 날짜 어떻게 들어오는지 보고 거래한 날짜 data.x에 넣기

  const data = [
    {
      id: 'nft1',
      data: [

        { x: '2019', y: 120 },
        { x: '2020', y: 150 },
        { x: '2021', y: 200 },
        { x: '2022', y: 250 },
        { x: '2023', y: 180 },
        { x: '2024', y: 180 },
        { x: '2025', y: 180 },
        { x: '2026', y: 180 },
        { x: '2027', y: 180 },
        { x: '2028', y: 180 },
        { x: '2029', y: 180 },
        { x: '2030', y: 180 },
        { x: '2031', y: 180 },
        { x: '2032', y: 180 },
        { x: '2033', y: 180 },
        { x: '2034', y: 180 },
        { x: '2035', y: 180 },
        { x: '2036', y: 180 },

      ],
    }
  ];

  // 최고 낙찰가, 최저 낙찰가
  const HIGHEST_BID = 200;
  const LOWEST_BID = 30;
  

  return (
    <>
      <div className={styles.bidWrapperDiv}>
        <div className={styles.bidWrapper}>
          <Icon icon="ph:arrow-line-up-bold" className={styles.priceArrow}/>
          <span className={styles.bidText}>
            최고 낙찰가 &nbsp;&nbsp; {HIGHEST_BID} SSF
          </span>
        </div>
        <div className={styles.bidWrapper}>
          <Icon icon="ph:arrow-line-down-bold" className={styles.priceArrow}/>
          <span className={styles.bidText}>
             최저 낙찰가 &nbsp;&nbsp; {LOWEST_BID} SSF
          </span>
        </div>
      </div>

      <ResponsiveLine
        data={data}
        margin={{ top: 25, right: 15, bottom: 50, left: 35 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        enableGridY={true}
        lineWidth={1}
        colors={{ scheme: 'category10' }}
        enablePoints={true}
        enableArea={false}
        areaOpacity={0.1}
        enableSlices='x'
        sliceTooltip={({ slice }) => {
          const format = (value: Date | number | string) => {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const meridiem = hour >= 12 ? '오후' : '오전';
            const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
            const formattedMinute = minute < 10 ? `0${minute}` : minute;
            return `${year}.${month}.${day} ${meridiem} ${formattedHour}:${formattedMinute}`;
          };

          return (
            <div className={styles.detailInfoBox}>
              <div>{format(slice.points[0].data.x)}</div>
              {slice.points.map((point) => (
                <div key={point.id} style={{ color: point.serieColor, marginTop: '5px' }}>
                  {point.data.yFormatted} SSF
                </div>
              ))}
            </div>
          );
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            onClick: () => {},
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default NftChart;

/* eslint-disable @next/next/no-img-element */
import { Box } from "@/components/box"
import { Container } from "@/components/container"
import { Text } from "@/components/text"
import useDebug from "@/hooks/useDebug"

export const Philosophy = () => {
  const { border } = useDebug()

  return (
    <>
      {/* mobile only */}
      <Box
        mobile
        css={{
          gridColumn: "span 12",
          border,

          img: {
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
          },
        }}
      >
        <img src="/philosophy.jpg" alt="Philosophy" />
      </Box>

      {/* mobile, tablet and desktop */}
      <Container
        css={{
          paddingTop: 88,
          paddingBottom: 60,
          background: "$background",
          "@tablet": {
            paddingTop: 250,
          },
        }}
      >
        {/* primary language */}
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            border,
            "@tablet": {
              gridColumn: "span 5",
            },
          }}
        >
          <Text headingS css={{ marginBottom: 40 }}>
            A New Perspective On Possibility
          </Text>
          <Text body>
            Our unique perspective draws from our combined experience at the
            world&apos;s top financial institutions and our deep well of
            domestic market knowledge.
          </Text>
          <Text body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
            ultricies enim. Aenean at nisl molestie nisi laoreet dapibus nec ac
            est. Duis felis ex, consectetur a massa non, convallis mattis urna.
            Sed nec metus eget felis pulvinar lacinia. Donec sodales dui lacus,
            eu vulputate nunc eleifend ac. Vivamus faucibus, lacus eget
            vestibulum luctus, diam sapien eleifend lorem, id auctor enim tellus
            sit amet arcu. Suspendisse aliquam lorem eu ipsum tristique, sed
            fringilla sapien ornare. Etiam viverra in mauris in feugiat.
            Praesent tempus hendrerit augue, et molestie nibh.
          </Text>
        </Box>

        {/* spacer hidden on mobile */}
        <Box
          css={{
            display: "none",
            "@tablet": {
              display: "flex",
              gridColumn: "span 1",
              border,
            },
          }}
        />

        {/* Secondary language (hides on mobile) */}
        <Box
          css={{
            display: "none",
            "@tablet": {
              display: "flex",
              flexDirection: "column",
              border,
              gridColumn: "span 5",
            },
          }}
        >
          <Text headingS css={{ marginBottom: 40, opacity: 0.5 }}>
            가능성에 대한 새로운 관점
          </Text>

          <Text body css={{ opacity: 0.5 }}>
            종교와 정치는 분리된다. 모든 국민은 행위시의 법률에 의하여 범죄를
            구성하지 아니하는 행위로 소추되지 아니하며. 교육의
            자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에
            의하여 보장된다. 나는 헌법을 준수하고 국가를 보위하며 조국의 평화적
            통일과 국민의 자유와 복리의 증진 및 민족문화의 창달에 노력하여
            대통령으로서의 직책을 성실히 수행할 것을 국민 앞에 엄숙히
            선서합니다. 법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에
            이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의
            폐회중에도 또한 같다. 탄핵소추의 의결을 받은 자는 탄핵심판이 있을
            때까지 그 권한행사가 정지된다. 모든 국민은 능력에 따라 균등하게
            교육을 받을 권리를 가진다. 국무위원은 국정에 관하여 대통령을
            보좌하며, 국무회의의 구성원으로서 국정을 심의한다.
          </Text>
        </Box>

        <Box
          tablet
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(13, 1fr)",
            columnGap: 10,
            gridColumn: "span 13",
            border,
          }}
        >
          <Box
            css={{
              gridColumn: "10/14",
              img: {
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
              },
            }}
          >
            <img src="/philosophy.jpg" alt="Philosophy" />
          </Box>
        </Box>
      </Container>
    </>
  )
}

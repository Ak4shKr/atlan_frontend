import { lazy, Suspense } from "react";
import {
  Box,
  ScrollArea,
  Paper,
  Text,
  Loader,
  Group,
  Button,
} from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import useHome from "./hook";
import SQLEditor from "../../components/code-editor";
import { CSVLink } from "react-csv";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Navbar } from "../../components/Navbar";

const AvailableTables = lazy(() => import("../../components/available-table"));
const QueryOutputTable = lazy(() =>
  import("../../components/query-output-table")
);

export const Home = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    error,
    columns,
    output,
    query,
    handleClear,
    handleEditorChange,
    handleExampleClick,
    handleRun,
    toggleHistoryDrawer,
    toggleGuidelinesDrawer,
    guidelinesdrawerOpened,
    historydrawerOpened,
    history,
    getAllData,
    dataReady,
  } = useHome();

  return (
    <Box style={{ height: "100vh" }}>
      <Navbar
        toggleGuidelinesDrawer={toggleGuidelinesDrawer}
        toggleHistoryDrawer={toggleHistoryDrawer}
        guidelinesdrawerOpened={guidelinesdrawerOpened}
        historydrawerOpened={historydrawerOpened}
        history={history}
        handleExampleClick={handleExampleClick}
      />
      <PanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        style={{ height: "calc(100% - 64px)" }}
      >
        <Panel defaultSize={50} minSize={20} maxSize={80}>
          <Box
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "6px",
            }}
          >
            <SQLEditor
              handleEditorChange={handleEditorChange}
              query={query}
              handleClear={handleClear}
              handleRun={handleRun}
            />

            <Suspense fallback={<Loader type="bars" size={"xs"} />}>
              <AvailableTables getAllData={getAllData} dataReady={dataReady} />
            </Suspense>
          </Box>
        </Panel>

        <PanelResizeHandle
          style={{ width: "2px", cursor: "col-resize", background: "#ccc" }}
        />

        <Panel defaultSize={50} minSize={20} maxSize={80}>
          <Paper p="md" h="100%" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="lg" fw={700}>
                Query Output
              </Text>
              {output.length > 0 && (
                <CSVLink
                  data={output}
                  filename="exported_data.csv"
                  className="btn"
                >
                  <Button variant="light" size="xs">
                    Export as CSV
                  </Button>
                </CSVLink>
              )}
            </Group>
            <ScrollArea style={{ height: "90%" }}>
              <Suspense fallback={<Loader type="bars" size={"xs"} />}>
                <QueryOutputTable
                  error={error}
                  output={output}
                  columns={columns}
                />
              </Suspense>
            </ScrollArea>
          </Paper>
        </Panel>
      </PanelGroup>
    </Box>
  );
};

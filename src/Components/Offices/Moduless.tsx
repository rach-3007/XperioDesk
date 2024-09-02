    import React from "react";
    import {
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Box,
    } from "@mui/material";

    interface Module {
    id: number;
    name: string;
    enabled: boolean;
    }

    const modulesData: Module[] = [
    { id: 1, name: "Module 1", enabled: true },
    { id: 2, name: "Module 2", enabled: false },
    ];

    const getInitials = (name: string): string => {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("");
    };

    const Moduless: React.FC = () => {
    const [modules, setModules] = React.useState<Module[]>(modulesData);

    const toggleModuleStatus = (id: number): void => {
        setModules((prevModules) =>
        prevModules.map((module) =>
            module.id === id ? { ...module, enabled: !module.enabled } : module
        )
        );
    };

    return (
        <Box
        sx={{
            padding: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 130px)', // Full height minus top bar and margin
        }}
        >
        <Grid container spacing={3} justifyContent="center">
            {modules.map((module) => (
            <Grid item xs={12} sm={6} md={4} key={module.id}>
                <Card
                sx={{
                    textAlign: "center",
                    padding: 2,
                    borderRadius: "20px",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
                >
                <Typography
                    variant="h4"
                    sx={{
                    backgroundColor: "#202a44",
                    color: "white",
                    borderRadius: "50%",
                    width: 80,
                    height: 80,
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    marginTop: 2,
                    }}
                >
                    {getInitials(module.name)}
                </Typography>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    {module.name}
                    </Typography>
                    <Button
                    variant="outlined"
                    sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                    }}
                    color={module.enabled ? "primary" : "secondary"}
                    onClick={() => toggleModuleStatus(module.id)}
                    >
                    {module.enabled ? "Disable" : "Enable"}
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            ))}

            {/* Card to add a new module */}
            <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                textAlign: "center",
                padding: 2,
                borderRadius: "20px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
                }}
            >
                <CardContent>
                <Typography variant="h6" color="primary">
                    + Add a Module
                </Typography>
                </CardContent>
            </Card>
            </Grid>
        </Grid>
        </Box>
    );
    };

    export default Moduless;

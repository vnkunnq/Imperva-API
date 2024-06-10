"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var papaparse_1 = require("papaparse");
var axios_1 = require("axios");
function CreateAlias(_a) {
    var _this = this;
    var buttonText = _a.buttonText;
    var _b = react_1.useDisclosure(), isOpen = _b.isOpen, onOpen = _b.onOpen, onClose = _b.onClose;
    var _c = react_2.useState(null), file = _c[0], setFile = _c[1];
    var _d = react_2.useState(true), isValidFile = _d[0], setIsValidFile = _d[1];
    var _e = react_2.useState(null), error = _e[0], setError = _e[1];
    var _f = react_2.useState(null), sessionId = _f[0], setSessionId = _f[1];
    var toast = react_1.useToast();
    react_2.useEffect(function () {
        var storedSessionId = localStorage.getItem('sessionId');
        setSessionId(storedSessionId);
    }, [isOpen]);
    var handleFileChange = function (event) {
        var _a, _b;
        var selectedFile = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (selectedFile) {
            var fileExtension = (_b = selectedFile.name.split('.').pop()) === null || _b === void 0 ? void 0 : _b.toLowerCase();
            if (fileExtension === 'csv' || fileExtension === 'xlsx') {
                setIsValidFile(true);
                setFile(selectedFile);
            }
            else {
                setIsValidFile(false);
                setFile(null);
            }
        }
    };
    var handleClose = function () {
        setFile(null);
        setIsValidFile(true);
        setError(null);
        onClose();
    };
    var handleImport = function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            if (!file)
                return [2 /*return*/];
            papaparse_1["default"].parse(file, {
                header: true,
                complete: function (results) { return __awaiter(_this, void 0, void 0, function () {
                    var data, _i, _a, row, gatewayName, aliasName, body, url, response, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                data = results.data;
                                _i = 0, _a = data;
                                _b.label = 1;
                            case 1:
                                if (!(_i < _a.length)) return [3 /*break*/, 6];
                                row = _a[_i];
                                gatewayName = row.gatewayName, aliasName = row.aliasName, body = __rest(row, ["gatewayName", "aliasName"]);
                                // Debugging: Check extracted values
                                console.log('Extracted gatewayName:', gatewayName);
                                console.log('Extracted alias:', aliasName);
                                if (!gatewayName || !aliasName) {
                                    setError('CSV row missing gatewayName or alias');
                                    return [2 /*return*/];
                                }
                                url = "/api/createAlias?gatewayName=" + encodeURIComponent(gatewayName) + "&aliasName=" + encodeURIComponent(aliasName);
                                _b.label = 2;
                            case 2:
                                _b.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, axios_1["default"].post(url, body, {
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Cookie": "JSESSIONID=" + sessionId
                                        },
                                        withCredentials: true
                                    })];
                            case 3:
                                response = _b.sent();
                                if (response.status === 200) {
                                    toast({
                                        title: "Import Successful",
                                        description: "The CSV file has been imported successfully.",
                                        status: "success",
                                        duration: 5000,
                                        isClosable: true
                                    });
                                }
                                else {
                                    toast({
                                        title: "Import Failed",
                                        description: response.data.message || "Error: " + response.status,
                                        status: "error",
                                        duration: 5000,
                                        isClosable: true
                                    });
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                error_1 = _b.sent();
                                if (error_1.response) {
                                    setError("Error: " + error_1.response.data.message);
                                    toast({
                                        title: "Import Failed",
                                        description: "Error: " + error_1.response.data.message,
                                        status: "error",
                                        duration: 5000,
                                        isClosable: true
                                    });
                                }
                                else {
                                    setError("An unknown error occurred.");
                                    toast({
                                        title: "Import Failed",
                                        description: "An unknown error occurred.",
                                        status: "error",
                                        duration: 5000,
                                        isClosable: true
                                    });
                                }
                                return [3 /*break*/, 6]; // Stop further processing if there's an error
                            case 5:
                                _i++;
                                return [3 /*break*/, 1];
                            case 6:
                                if (!error) {
                                    handleClose();
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(react_1.Button, { _hover: { bg: 'grey' }, w: "170px", textColor: "black", borderWidth: "1px", borderColor: "grey", onClick: onOpen }, buttonText),
        React.createElement(react_1.Modal, { isOpen: isOpen, onClose: handleClose },
            React.createElement(react_1.ModalOverlay, null),
            React.createElement(react_1.ModalContent, null,
                React.createElement(react_1.ModalHeader, null, "Import File"),
                React.createElement(react_1.ModalCloseButton, null),
                React.createElement(react_1.ModalBody, null,
                    React.createElement(react_1.VStack, { spacing: 4 },
                        React.createElement(react_1.Input, { type: "file", accept: ".csv,.xlsx", onChange: handleFileChange }),
                        !isValidFile && (React.createElement(react_1.Alert, { status: "error" },
                            React.createElement(react_1.AlertIcon, null),
                            "Not a CSV or XLSX file")),
                        error && (React.createElement(react_1.Alert, { status: "error" },
                            React.createElement(react_1.AlertIcon, null),
                            error)))),
                React.createElement(react_1.ModalFooter, null,
                    React.createElement(react_1.Button, { colorScheme: "blue", mr: 3, onClick: handleImport, isDisabled: !file }, "Import"),
                    React.createElement(react_1.Button, { colorScheme: "red", onClick: handleClose }, "Cancel"))))));
}
exports["default"] = CreateAlias;

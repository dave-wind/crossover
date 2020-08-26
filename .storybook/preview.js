
import React from "react";
import { GlobalStyle } from "../src/components/shared/global";
import { addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import "../src/styles/index.scss"

addParameters({
	options: {
		showRoots: true,
	},
	dependencies: {
		withStoriesOnly: true,
		hideEmpty: true,
	},
});
addDecorator(withA11y);
addDecorator((story) => (
	<>
		{story()}
	</>
));
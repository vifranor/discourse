import { isAppWebview, isiOSPWA } from "discourse/lib/utilities";
import Controller from "@ember/controller";
import discourseComputed from "discourse-common/utils/decorators";
import { inject as service } from "@ember/service";

export default Controller.extend({
  showTop: true,
  showFooter: false,
  router: service(),
  queryParams: ["glimmer"],

  @discourseComputed("glimmer")
  useGlimmer(glimmer) {
    return glimmer === "1";
  },

  @discourseComputed
  canSignUp() {
    return (
      !this.siteSettings.invite_only &&
      this.siteSettings.allow_new_registrations &&
      !this.siteSettings.enable_discourse_connect
    );
  },

  @discourseComputed
  loginRequired() {
    return this.siteSettings.login_required && !this.currentUser;
  },

  @discourseComputed
  showFooterNav() {
    return isAppWebview() || isiOSPWA();
  },
});
